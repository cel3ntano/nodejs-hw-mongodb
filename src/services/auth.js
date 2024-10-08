import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import {
  accessTokenValidityTime,
  refreshTokenValidityTime,
} from '../constants/users-constants.js';

export const findUser = (filter) => User.findOne(filter);
export const findSessionByAccessToken = (accessToken) =>
  Session.findOne({ accessToken });

export const registerUser = async (userRegistrationData) => {
  const { password } = userRegistrationData;
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ ...userRegistrationData, password: hashedPassword });
};

export const loginUser = async (userId) => {
  await Session.deleteOne({ userId });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + accessTokenValidityTime;
  const refreshTokenValidUntil = Date.now() + refreshTokenValidityTime;

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};
