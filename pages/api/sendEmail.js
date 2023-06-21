import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import jwt_decode from 'jwt-decode';
import cookie from 'cookie';
import fetch from 'node-fetch'; // You might need to install this with npm

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderName, senderEmail, emailSubject, emailBody, recipientEmails, userID } = req.body;

    // Fetch the refresh token from the API
    const refreshTokenResponse = await fetch(`https://yay-api.herokuapp.com/login/getRefreshToken?userID=${userID}`);
    const refreshTokenData = await refreshTokenResponse.json();
    const refreshToken = refreshTokenData.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token missing' });
    }

    const OAuth2 = google.auth.OAuth2;
    const OAuth2_client = new OAuth2(process.env.GOOGLE_ID, process.env.GOOGLE_SECRET);
    OAuth2_client.setCredentials({ refresh_token: refreshToken });

    const accessToken = await OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: senderEmail,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: refreshToken,
        accessToken: accessToken
      }
    });

    const mail_options = {
      from: `${senderName} <${senderEmail}>`,
      to: recipientEmails.join(','),
      subject: emailSubject,
      html: emailBody
    };

    try {
      const result = await transport.sendMail(mail_options);
      console.log("Email sent successfully:", result);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } finally {
      transport.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}