// pages/api/oauth2callback.js

import { google } from 'googleapis';

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
  
      // Here you should save the tokens to your database associated with the user
      // For simplicity, we're just sending them back to the client
      // res.status(200).json(tokens);
      res.redirect('https://www.console.bundl.com'); // Redirect the user back to your site
    } catch (error) {
      console.error('Error exchanging authorization code for tokens:', error);
      res.status(500).send('Error exchanging authorization code for tokens');
    }
  }