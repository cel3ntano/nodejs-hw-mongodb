import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const deleteContactById = (id) =>
  ContactsCollection.findByIdAndDelete(id);

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export const updateContact = async (id, payload, options = {}) =>
  ContactsCollection.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
