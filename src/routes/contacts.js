import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(patchContactController));

export default router;
