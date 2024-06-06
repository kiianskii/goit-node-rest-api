import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();
export const getContactById = (_id) => Contact.findOne(_id);
export const removeContact = (_id) => Contact.findOneAndDelete(_id);
export const addContact = (data) => Contact.create(data);
export const updateContactById = (_id, data) =>
  Contact.findOneAndUpdate(_id, data);
export const updateStatusContact = (_id, data) =>
  Contact.findByIdAndUpdate(_id, data);
