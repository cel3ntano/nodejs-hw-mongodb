import createHttpError from 'http-errors';
import { findUser, loginUser, registerUser } from '../services/auth.js';
import { refreshTokenValidityTime } from '../constants/users-constants.js';
import bcrypt from 'bcrypt';

export const registerController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const newUser = await registerUser(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'User successfully registered',
    data,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) throw createHttpError(401, 'Wrong credentials');

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) throw createHttpError(401, 'Wrong credentials');

  const session = await loginUser(user._id);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenValidityTime),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: session.accessToken },
  });
};
