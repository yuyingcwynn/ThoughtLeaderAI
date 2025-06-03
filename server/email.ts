import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

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

    await mailService.send({
      to: 'yuyingcwynn@gmail.com',
      from: 'noreply@wittinglyventures.com', // Use your verified sender
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      text: emailContent,
      replyTo: data.email
    });

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

    await mailService.send({
      to: data.email,
      from: 'noreply@wittinglyventures.com', // Use your verified sender
      subject: 'Thank you for contacting Wittingly Ventures',
      text: autoReplyContent
    });

    console.log('Auto-reply email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    return false;
  }
}