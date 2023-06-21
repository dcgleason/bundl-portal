// pages/api/oauth2callback.js

import { google } from 'googleapis';
import cookie from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    res.status(400).send('Missing authorization code');
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    'https://www.console.givebundl.com/api/oauth2callback'
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Set the tokens in a cookie
    res.setHeader('Set-Cookie', cookie.serialize('auth', JSON.stringify(tokens), {
        httpOnly: true,
        secure: false, // Use HTTPS in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'None', // Changed from 'strict' to 'lax'
        path: '/',
      }));
      
    res.redirect('https://www.console.givebundl.com'); // Redirect the user back to your site
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error);
    res.status(500).send('Error exchanging authorization code for tokens');
  }
}