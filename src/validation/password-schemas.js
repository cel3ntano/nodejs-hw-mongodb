import Joi from 'joi';
import { emailRegExp } from '../constants/users-constants.js';

export const passwordResetRequestValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

export const passwordResetValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});
