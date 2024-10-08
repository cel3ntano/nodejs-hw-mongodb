import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginController,
  logoutController,
  registerController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from '../validation/user-schemas.js';
import { refreshController } from '../controllers/auth.js';

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

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
