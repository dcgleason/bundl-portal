import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import jwt_decode from 'jwt-decode';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderName, senderEmail, emailSubject, emailBody, recipientEmails } = req.body;

    // Extract the Bearer token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    // Decode the JWT token to get the user's ID
    const decodedToken = jwt_decode(token);
    const userID = decodedToken.userID;
    if (!userID) {
      return res.status(401).json({ error: 'User ID is not available in the decoded JWT token' });
    }

    const OAuth2 = google.auth.OAuth2;
    const OAuth2_client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);
    OAuth2_client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    const mail_options = {
      from: `${senderName} <${senderEmail}>`,
      to: recipientEmails.join(','),
      subject: emailSubject,
      html: emailBody
    };

    transport.sendMail(mail_options, (error, result) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log("Email sent successfully:", result);
        res.status(200).json({ message: 'Email sent successfully' });
      }
      transport.close();
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}