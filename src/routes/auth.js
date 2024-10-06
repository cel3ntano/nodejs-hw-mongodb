import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { userSignUpValidationSchema } from '../validation/user-schemas.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignUpValidationSchema),
  ctrlWrapper(registerController),
);
authRouter.post('/login');
authRouter.post('/refresh');
authRouter.post('/logout');

export default authRouter;
