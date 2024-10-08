import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const unauthorizedError = 'Access token expired';
  const authorization = req.get('Authorization');

  if (!authorization) return next(createHttpError(401, unauthorizedError));

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token)
    return next(createHttpError(401, unauthorizedError));

  const session = await findSession(token);
  if (!session) {
    return next(createHttpError(401, unauthorizedError));
  }

  const isTokenValid = new Date() < new Date(session.accessTokenValidUntil);
  if (!isTokenValid) {
    return next(createHttpError(401, unauthorizedError));
  }

  const user = await findUser(session.userId);

  if (!user) {
    return next(createHttpError(401, unauthorizedError));
  }

  req.user = user;
  next();
};
