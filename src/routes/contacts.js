import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import upload from '../middlewares/uploadIntoTempDir.js';
import * as contactControllers from '../controllers/contacts.js';
import * as contactSchemas from '../validation/contact-schemas.js';

const contactsRouter = Router();
contactsRouter.use('/', authenticate);
contactsRouter.use('/:contactId', isValidId('contactId'));
contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController));
contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactControllers.getContactByIdController),
);
contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactControllers.deleteContactController),
);
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactSchemas.createContactValidationSchema),
  ctrlWrapper(contactControllers.createContactController),
);
contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(contactSchemas.updateContactValidationSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

export default contactsRouter;
