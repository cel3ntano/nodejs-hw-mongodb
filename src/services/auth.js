import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';
import { randomBytes } from 'crypto';
import { generatePasswordResetEmail } from '../utils/generatePasswordResetEmail.js';
import { createJwtToken } from '../utils/jwt.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcrypt';
import currentYear from '../utils/getCurrentYear.js';
import env from '../utils/env.js';
import {
  accessTokenValidityTime,
  refreshTokenValidityTime,
} from '../constants/users-constants.js';
import { validateGoogleOAuthCode } from '../utils/googleOAuth2.js';

export const findUser = (filter) => User.findOne(filter);
export const findSession = (filter) => Session.findOne(filter);
export const logoutUser = (sessionId) => Session.findOneAndDelete(sessionId);

const generateSessionData = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + accessTokenValidityTime;
  const refreshTokenValidUntil = Date.now() + refreshTokenValidityTime;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const registerUser = async (userRegistrationData) => {
  const { password } = userRegistrationData;
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ ...userRegistrationData, password: hashedPassword });
};

export const loginUser = async (userId) => {
  await Session.deleteOne({ userId });
  const newSession = generateSessionData();
  return Session.create({
    userId,
    ...newSession,
  });
};

export const refreshSession = async (refreshToken) => {
  const oldSession = await Session.findOneAndDelete(refreshToken);
  const newSession = generateSessionData();
  return Session.create({
    userId: oldSession.userId,
    ...newSession,
  });
};

export const sendPasswordResetToken = async (user) => {
  const { _id: userId, name: userName, email } = user;
  const passwordResetToken = createJwtToken({
    sub: userId,
    email,
  });

  const resetLink = `${env(
    'FRONTEND_DOMAIN',
  )}/reset-password?token=${passwordResetToken}`;

  const emailData = {
    to: email,
    subject: 'Reset password',
    html: generatePasswordResetEmail({
      userName,
      resetLink,
      currentYear,
    }),
  };

  return sendEmail(emailData);
};

export const resetPassword = async (userId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.findByIdAndUpdate(userId, { password: hashedPassword });
};

export const authenticateGoogleOauth = async (oauthCode) => {
  const loginTicket = await validateGoogleOAuthCode(oauthCode);
  const userData = loginTicket.getPayload();

  let user = await User.findOne({ email: userData.email });
  if (!user) {
    const password = randomBytes(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      password: hashedPassword,
      email: userData.email,
      name: userData.name,
    });
  }

  const newSession = generateSessionData();
  return Session.create({
    userId: user._id,
    ...newSession,
  });
};
