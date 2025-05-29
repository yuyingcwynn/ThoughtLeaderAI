import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertContactInquirySchema, insertConsultationSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.json({ success: true, inquiry });
    } catch (error: any) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: "Failed to submit contact form: " + error.message 
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
      
      if (consultationId) {
        try {
          await storage.updateConsultationStatus(parseInt(consultationId), 'paid');
          console.log(`Consultation ${consultationId} marked as paid`);
        } catch (error) {
          console.error('Error updating consultation status:', error);
        }
      }
    }

    res.json({ received: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
