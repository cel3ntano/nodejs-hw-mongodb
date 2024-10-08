import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import {
  accessTokenValidityTime,
  refreshTokenValidityTime,
} from '../constants/users-constants.js';

export const findUser = (filter) => User.findOne(filter);
export const findSession = (filter) => Session.findOne(filter);
export const logoutUser = (sessionId) => Session.findOneAndDelete(sessionId);

const createSession = () => {
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
  const newSession = createSession();
  return Session.create({
    userId,
    ...newSession,
  });
};

export const refreshSession = async (refreshToken) => {
  const oldSession = await Session.findOneAndDelete(refreshToken);
  const newSession = createSession();
  return Session.create({
    userId: oldSession.userId,
    ...newSession,
  });
};
