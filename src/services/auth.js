import { User } from '../db/models/User.js';
import bcrypt from 'bcrypt';

export const findUser = (filter) => User.findOne(filter);

export const registerUser = async (userData) => {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ ...userData, password: hashedPassword });
};
