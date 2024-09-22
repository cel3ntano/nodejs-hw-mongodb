import { ContactsCollection } from '../db/models/contacts.js';
import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (payload) => {
  const { name, phoneNumber, contactType, email, isFavourite } = payload;
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'name, phoneNumber, and contactType are required fields',
    );
  }

  return await ContactsCollection.create(payload);
};

export const updateContact = async (id, payload, options = {}) => {
  const updatedContactRawData = await ContactsCollection.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updatedContactRawData.value) {
    throw createHttpError(404, 'Contact not found');
  }
  return updatedContactRawData.value;
};

export const deleteContactById = async (id) => {
  const removedContact = await ContactsCollection.findByIdAndDelete(id);
  if (!removedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return removedContact;
};
