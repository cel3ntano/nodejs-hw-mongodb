import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as authControllers from '../controllers/auth.js';
import * as userSchemas from '../validation/user-schemas.js';
import * as passwordResetSchemas from '../validation/password-schemas.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSchemas.userSignUpValidationSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(userSchemas.userSignInValidationSchema),
  ctrlWrapper(authControllers.loginController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(passwordResetSchemas.passwordResetRequestValidationSchema),
  ctrlWrapper(authControllers.passwordResetRequestController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(passwordResetSchemas.passwordResetValidationSchema),
  ctrlWrapper(authControllers.passwordResetController),
);

authRouter.get(
  '/google-oauth-url',
  ctrlWrapper(authControllers.getGoogleOauthUrlController),
);

authRouter.post(
  '/google-oauth-verify',
  validateBody(userSchemas.userGoogleOauthValidationSchema),
  ctrlWrapper(authControllers.authenticateGoogleOauthController),
);

export default authRouter;
