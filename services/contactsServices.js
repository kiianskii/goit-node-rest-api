import Contact from "../models/Contact.js";

export const listContacts = (params = {}) => {
  const { filter, fields, settings } = params;
  return Contact.find(filter, fields, settings);
};
export const getContactById = (filter) => Contact.findOne(filter);
export const removeContact = (filter) => Contact.findOneAndDelete(filter);
export const addContact = (data) => Contact.create(data);
export const updateContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
export const updateStatusContact = (filter, data) =>
  Contact.findByIdAndUpdate(filter, data);
