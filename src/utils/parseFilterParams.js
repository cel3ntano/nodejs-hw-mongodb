import { BOOLEANS, CONTACTS_FILTER } from '../constants/index.js';

export const parseFilterParams = (query) => {
  const contactType = Object.values(CONTACTS_FILTER.CONTACT_TYPE).includes(
    query.contactType,
  )
    ? query.contactType
    : CONTACTS_FILTER.CONTACT_TYPE.PERSONAL;

  const isFavourite = query.isFavourite === BOOLEANS.TRUE ? true : false;

  return { contactType, isFavourite: isFavourite };
};
