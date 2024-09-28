import { CONTACTS_SORT_BY, SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = CONTACTS_SORT_BY.NAME,
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();

  if (filters.contactType) {
    contactsQuery.where('contactType').equals(filters.contactType);
  }

  if (filters.isFavourite || filters.isFavourite === false) {
    contactsQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({
        [sortBy]: sortOrder,
      }),
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
