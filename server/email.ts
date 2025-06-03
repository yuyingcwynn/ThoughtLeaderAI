import nodemailer from 'nodemailer';

// Create SMTP transporter for Outlook.com with correct settings
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  serviceInterest?: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return false;
    }

    const emailContent = `
New Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Service Interest: ${data.serviceInterest || 'Not specified'}

Message:
${data.message}

---
This message was sent from your Wittingly Ventures contact form.
    `.trim();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'yuyingcwynn@gmail.com',
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      text: emailContent,
      replyTo: data.email
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return false;
  }
}

// Auto-reply to the person who submitted the form
export async function sendContactAutoReply(data: ContactEmailData): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email credentials not configured');
      return false;
    }

    const autoReplyContent = `
Hi ${data.firstName},

Thank you for reaching out to Wittingly Ventures! I've received your message and will get back to you within 24 hours.

Your inquiry regarding ${data.serviceInterest || 'our services'} is important to me, and I look forward to discussing how we can help transform your AI strategy.

Best regards,
Yu Ying
Wittingly Ventures

---
This is an automated response. Please do not reply to this email.
    `.trim();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Thank you for contacting Wittingly Ventures',
      text: autoReplyContent
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    return false;
  }
}