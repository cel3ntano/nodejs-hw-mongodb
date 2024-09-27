import { ContactsCollection } from '../db/models/contacts.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const skip = (page - 1) * perPage;
  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(),
    ContactsCollection.find().skip(skip).limit(perPage),
  ]);

  return {
    contacts,
    ...createPaginationData(page, perPage, totalItems),
  };
};

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const deleteContactById = (id) =>
  ContactsCollection.findByIdAndDelete(id);

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export const updateContact = (id, payload, options = {}) =>
  ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
