import Joi from 'joi';
import { emailRegExp } from '../constants/users-constants.js';

export const userSignUpValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

export const userSignInValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});
