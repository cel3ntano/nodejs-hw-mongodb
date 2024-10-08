import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginController, registerController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from '../validation/user-schemas.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignUpValidationSchema),
  ctrlWrapper(registerController),
);
authRouter.post(
  '/login',
  validateBody(userSignInValidationSchema),
  ctrlWrapper(loginController),
);
authRouter.post('/refresh');
authRouter.post('/logout');

export default authRouter;
