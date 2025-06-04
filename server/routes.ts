import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import passport from "passport";
import { storage } from "./storage";
import { requireAuth } from "./auth";
import { insertContactInquirySchema, insertConsultationSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendContactAutoReply } from "./email";
import { prerenderMiddleware } from "./prerender";
import { generateDynamicSitemap, generateRobotsTxt, addSecurityHeaders } from "./seo-utils";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Add security headers for better SEO trust signals
  app.use(addSecurityHeaders);

  // Create consultation with authentication and credit tracking
  app.post("/api/create-consultation", requireAuth, async (req, res) => {
    try {
      console.log("Received consultation data:", req.body);
      
      // Get authenticated user
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      // Simple validation
      const { firstName, lastName, email, serviceType, packageType, packageHours, amount } = req.body;
      
      if (!firstName || !lastName || !email || !serviceType) {
        return res.status(400).json({ 
          message: "Missing required fields: firstName, lastName, email, serviceType" 
        });
      }
      
      // Create consultation record in database
      const consultationData = {
        userId: user.id,
        firstName,
        lastName,
        email,
        company: req.body.company || null,
        serviceType,
        notes: req.body.notes || null,
        sessionType: req.body.sessionType || "dial-an-ai-expert",
        packageType: packageType || "1 hour",
        packageHours: packageHours || "1",
        amount
      };
      
      const consultation = await storage.createConsultation(consultationData);
      
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Already in cents
        currency: "usd",
        metadata: {
          consultationId: consultation.id.toString(),
          userId: user.id.toString(),
          packageHours: packageHours || "1",
          serviceType,
          packageType: packageType || "1 hour",
        }
      });

      // Update consultation with payment intent ID
      await storage.updateConsultationPaymentIntent(consultation.id, paymentIntent.id);

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        consultationId: consultation.id
      });
    } catch (error: any) {
      console.error("Create consultation error:", error);
      res.status(500).json({ 
        message: "Error creating consultation: " + error.message 
      });
    }
  });
  
  // Contact form submission - email only, no database
  app.post("/api/contact", async (req, res) => {
    try {
      // Simple validation of required fields
      const { firstName, lastName, email, message } = req.body;
      
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ 
          message: "Please fill in all required fields" 
        });
      }
      
      // Log the contact form submission details
      console.log("=== NEW CONTACT FORM SUBMISSION ===");
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email: ${email}`);
      console.log(`Company: ${req.body.company || 'Not provided'}`);
      console.log(`Service Interest: ${req.body.serviceInterest || 'Not specified'}`);
      console.log(`Message: ${message}`);
      console.log("=====================================");
      
      // Attempt to send email notifications
      try {
        const emailResults = await Promise.allSettled([
          sendContactNotification({
            firstName,
            lastName,
            email,
            company: req.body.company || "",
            serviceInterest: req.body.serviceInterest || "",
            message
          }),
          sendContactAutoReply({
            firstName,
            lastName,
            email,
            company: req.body.company || "",
            serviceInterest: req.body.serviceInterest || "",
            message
          })
        ]);
        
        // Check if at least the notification email was sent
        const notificationResult = emailResults[0];
        if (notificationResult.status === 'fulfilled' && notificationResult.value) {
          console.log("✅ Contact notification email sent successfully");
          res.json({ success: true, message: "Message sent successfully!" });
        } else {
          console.log("⚠️ Email delivery failed, but contact form details logged above");
          // Return success since we've captured the information
          res.json({ success: true, message: "Message received! Check server logs for details." });
        }
      } catch (emailError) {
        console.log("⚠️ Email service error, but contact form details logged above");
        console.error("Email error details:", emailError);
        // Return success since we've captured the information
        res.json({ success: true, message: "Message received! Check server logs for details." });
      }
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Failed to process message: " + error.message 
      });
    }
  });

  // Stripe payment intent for consultation bookings
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, sessionType = "dial-an-ai-expert", ...consultationData } = req.body;
      
      // Validate consultation data
      const validatedConsultation = insertConsultationSchema.parse({
        ...consultationData,
        sessionType,
        amount: Math.round(amount * 100) // Convert to cents
      });

      // Create consultation record
      const consultation = await storage.createConsultation(validatedConsultation);

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          consultationId: consultation.id.toString(),
          sessionType,
          clientEmail: validatedConsultation.email
        }
      });

      // Update consultation with payment intent ID
      await storage.updateConsultationPaymentIntent(consultation.id, paymentIntent.id);

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        consultationId: consultation.id
      });
    } catch (error: any) {
      console.error("Payment intent creation error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });



  // Get consultation details
  app.get("/api/consultation/:id", async (req, res) => {
    try {
      const consultationId = parseInt(req.params.id);
      const consultation = await storage.getConsultation(consultationId);
      
      if (!consultation) {
        return res.status(404).json({ message: "Consultation not found" });
      }
      
      res.json(consultation);
    } catch (error: any) {
      console.error("Get consultation error:", error);
      res.status(500).json({ 
        message: "Error retrieving consultation: " + error.message 
      });
    }
  });

  // Stripe webhook handler for payment confirmations
  app.post("/api/webhook/stripe", async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    try {
      if (process.env.STRIPE_WEBHOOK_SECRET) {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } else {
        event = req.body;
      }
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle payment intent succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const consultationId = paymentIntent.metadata?.consultationId;
      const userId = paymentIntent.metadata?.userId;
      const packageHours = paymentIntent.metadata?.packageHours;
      
      if (consultationId && userId && packageHours) {
        try {
          // Mark consultation as paid
          await storage.updateConsultationStatus(parseInt(consultationId), 'paid');
          
          // Add consultation hours to user's balance
          const hoursToAdd = parseFloat(packageHours);
          await storage.updateUserBalance(parseInt(userId), hoursToAdd);
          
          console.log(`Consultation ${consultationId} marked as paid, added ${hoursToAdd} hours to user ${userId}`);
        } catch (error) {
          console.error('Error updating consultation status:', error);
        }
      }
    }

    res.json({ received: true });
  });

  // Calendly webhook handler for booking confirmations
  app.post("/api/webhook/calendly", async (req, res) => {
    try {
      const event = req.body;
      
      // Handle invitee.created event (when someone books a session)
      if (event.event === 'invitee.created') {
        const inviteeEmail = event.payload.email;
        const calendlyEventId = event.payload.event;
        const scheduledAt = new Date(event.payload.scheduled_event.start_time);
        
        // Find consultation by email and update with Calendly info
        // Note: In a real implementation, you'd want to store consultation ID in Calendly's tracking fields
        console.log(`Calendly booking confirmed for ${inviteeEmail} at ${scheduledAt}`);
        console.log(`Calendly Event ID: ${calendlyEventId}`);
        
        // You could implement logic here to:
        // 1. Find the consultation record by email
        // 2. Update it with the Calendly event ID and scheduled date
        // 3. Send confirmation emails
        // 4. Deduct hours from the package if implementing hour tracking
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error('Calendly webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  });

  // User authentication routes
  app.get('/api/user/me', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });

  // Google OAuth routes
  app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      const returnTo = req.query.returnTo as string;
      if (returnTo) {
        res.redirect(returnTo);
      } else {
        res.redirect('/dashboard');
      }
    }
  );

  app.post('/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  // SEO Routes
  app.get('/sitemap.xml', generateDynamicSitemap);
  app.get('/robots.txt', generateRobotsTxt);
  
  // Additional SEO endpoints
  app.get('/.well-known/security.txt', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(`Contact: mailto:contact@wittinglyventures.com
Expires: 2026-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: https://wittinglyventures.com/.well-known/security.txt`);
  });

  // Dashboard data routes (protected)
  app.get('/api/user/balance', requireAuth, async (req, res) => {
    try {
      const user = (req as any).user;
      const userData = await storage.getUser(user.id);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({
        totalHours: parseFloat(userData.totalHoursBalance),
        usedHours: parseFloat(userData.usedHours),
        availableHours: parseFloat(userData.totalHoursBalance) - parseFloat(userData.usedHours)
      });
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching user balance: ' + error.message });
    }
  });

  app.get('/api/user/sessions', requireAuth, async (req, res) => {
    try {
      const user = (req as any).user;
      const sessions = await storage.getUserSessions(user.id);
      res.json(sessions);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching user sessions: ' + error.message });
    }
  });

  app.get('/api/user/consultations', requireAuth, async (req, res) => {
    try {
      const user = (req as any).user;
      const consultations = await storage.getUserConsultations(user.id);
      res.json(consultations);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching user consultations: ' + error.message });
    }
  });

  // AI Bootcamp Waitlist Endpoint
  app.post("/api/bootcamp-waitlist", async (req, res) => {
    try {
      const { name, email, productIdea } = req.body;

      if (!name || !email || !productIdea) {
        return res.status(400).json({ 
          message: "Missing required fields: name, email, productIdea" 
        });
      }

      // Send email notification
      const emailData = {
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email,
        company: 'AI Bootcamp Waitlist',
        serviceInterest: 'Idea Accelerator Sprint',
        message: `Product Idea: ${productIdea}`
      };

      const emailSent = await sendContactNotification(emailData);
      
      if (!emailSent) {
        console.error('Failed to send waitlist notification email');
      }

      res.json({ 
        success: true, 
        message: "Successfully added to waitlist" 
      });
    } catch (error: any) {
      console.error("Bootcamp waitlist error:", error);
      res.status(500).json({ 
        message: "Error processing waitlist request: " + error.message 
      });
    }
  });

  // AI Bootcamp Intensive Application Endpoint
  app.post("/api/bootcamp-intensive", async (req, res) => {
    try {
      const { name, email, productDescription } = req.body;

      if (!name || !email || !productDescription) {
        return res.status(400).json({ 
          message: "Missing required fields: name, email, productDescription" 
        });
      }

      // Send email notification
      const emailData = {
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || '',
        email,
        company: 'AI Bootcamp Application',
        serviceInterest: 'Product Studio Intensive',
        message: `Product Description: ${productDescription}\n\nNote: Application includes additional documentation for review.`
      };

      const emailSent = await sendContactNotification(emailData);
      
      if (!emailSent) {
        console.error('Failed to send intensive application notification email');
      }

      res.json({ 
        success: true, 
        message: "Application submitted successfully. We'll review and contact you if you meet our initial criteria." 
      });
    } catch (error: any) {
      console.error("Bootcamp intensive application error:", error);
      res.status(500).json({ 
        message: "Error processing application: " + error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
