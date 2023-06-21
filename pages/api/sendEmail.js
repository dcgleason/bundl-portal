import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import jwt_decode from 'jwt-decode';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderName, senderEmail, emailSubject, emailBody, recipientEmails } = req.body;

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    
    const decoded = jwt_decode(bearerToken);
    const refreshToken = decoded.refresh_token;
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token missing' });
    }

    const OAuth2 = google.auth.OAuth2;
    const OAuth2_client =new OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET);
    OAuth2_client.setCredentials({ refresh_token: refreshToken });

    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
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