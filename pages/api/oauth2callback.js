// pages/api/oauth2callback.js

import { google } from 'googleapis';
import cookie from 'cookie';
import fetch from 'node-fetch'; // You might need to install this with npm

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
        httpOnly: false,
        secure: true, // Use HTTPS in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax', // Changed from 'strict' to 'lax'
        path: '/',
      }));

    // Get the user's profile
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const me = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names',
    });

    // Get the user's email address
    const userGoogleId = me.data.resourceName;
    const userGoogleEmail = me.data.emailAddresses && me.data.emailAddresses.length && me.data.emailAddresses[0].value;

    // Make a request to your API to save the refresh token
    const apiResponse = await fetch('https://your-api.com/saveRefreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId: userGoogleId,
        email: userGoogleEmail,
        refreshToken: tokens.refresh_token,
      }),
    });

    if (!apiResponse.ok) {
      throw new Error(`API response status: ${apiResponse.status}`);
    }

    res.redirect('https://www.console.givebundl.com'); // Redirect the user back to your site
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error');
  }
}