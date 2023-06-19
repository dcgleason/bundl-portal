// pages/api/oauth2callback.js

import { google } from 'googleapis';

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    res.status(400).send('Missing authorization code');
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'http://localhost:3000/api/oauth2callback' // This should be your actual server address
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Here you should save the tokens to your database associated with the user
    // For simplicity, we're just sending them back to the client
    res.status(200).json(tokens);
  } catch (error) {
    console.error('Error exchanging authorization code for tokens:', error);
    res.status(500).send('Error exchanging authorization code for tokens');
  }
}
