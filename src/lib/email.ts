import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_BMUdMxzs_6Jz6fNarqwvZ5wvpcbWEDVyw');

// Verify Resend connection
export const verifySMTP = async () => {
  try {
    // Test Resend by sending a simple email to verify connection
    const result = await resend.emails.send({
      from: 'Code Studio <info@cod-st.com>',
      to: ['info@cod-st.com'],
      subject: 'Resend Connection Test',
      html: '<p>This is a test email to verify Resend connection.</p>'
    });
    
    console.log('Resend connection successful:', result.data?.id);
    return true;
  } catch (error) {
    console.error('Resend verification failed:', error);
    return false;
  }
};

// Send contact form email
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  service?: string;
  phone?: string;
}) => {
  try {
    const result = await resend.emails.send({
      from: 'Code Studio <info@cod-st.com>',
      to: ['info@cod-st.com'],
      replyTo: formData.email,
      subject: `New Contact Form Submission: ${formData.subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #04334C;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #04334C; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            ${formData.service ? `<p><strong>Service Interest:</strong> ${formData.service}</p>` : ''}
            ${formData.subject ? `<p><strong>Subject:</strong> ${formData.subject}</p>` : ''}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #04334C;">
            <h3 style="color: #04334C; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              This email was sent from the Code Studio website contact form.
              <br>Reply directly to this email to respond to the customer.
            </p>
          </div>
        </div>
      `
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: error.message };
  }
};

// Send meeting booking email
export const sendMeetingEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}) => {
  try {
    const result = await resend.emails.send({
      from: 'Code Studio <info@cod-st.com>',
      to: ['info@cod-st.com'],
      replyTo: formData.email,
      subject: `Meeting Booking Request: ${formData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #04334C;">New Meeting Booking Request</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #04334C; margin-top: 0;">Meeting Details</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Service:</strong> ${formData.service}</p>
            <p><strong>Preferred Date:</strong> ${formData.date}</p>
            <p><strong>Preferred Time:</strong> ${formData.time}</p>
          </div>
          
          ${formData.message ? `
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #04334C;">
              <h3 style="color: #04334C; margin-top: 0;">Additional Message</h3>
              <p style="white-space: pre-wrap;">${formData.message}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px; color: #6c757d;">
              This meeting booking was sent from the Code Studio website.
              <br>Please confirm the meeting time with the client.
            </p>
          </div>
        </div>
      `
    });

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending meeting email:', error);
    return { success: false, error: error.message };
  }
};

export default resend;
