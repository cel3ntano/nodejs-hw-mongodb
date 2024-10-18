import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import env from './env.js';
import createHttpError from 'http-errors';
import * as path from 'node:path';

const isProduction = env('IS_PRODUCTION') === 'true';
const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_secret');
const oauthConfigPath = path.resolve('google_oauth.json');
const oauthConfig = JSON.parse(await readFile(oauthConfigPath, 'utf-8'));

const redirectUris = oauthConfig.web.redirect_uris;
const redirectUri = isProduction ? redirectUris[1] : redirectUris[0];

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
});

export const validateGoogleOAuthCode = async (oauthCode) => {
  const response = await googleOAuthClient.getToken(oauthCode);

  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');
  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const generateGoogleOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};
