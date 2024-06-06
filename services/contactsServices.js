import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();
export const getContactById = (_id) => Contact.findOne(_id);
export const removeContact = (_id) => Contact.findOneAndDelete(_id);
export const addContact = (data) => Contact.create(data);
export const updateContactById = (_id, data) =>
  Contact.findOneAndUpdate(_id, data);
// export const updateStatusContact = () => Contact.find();

// export async function getContactById(id) {
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === id);

//   return result || null;
// }

// export async function removeContact(id) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await updateContacts(contacts);

//   return result;
// }

// export async function addContact(data) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     ...data,
//   };
//   contacts.push(newContact);
//   await updateContacts(contacts);

//   return newContact;
// }

// export async function updateContactById(id, data) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { ...contacts[index], ...data };
//   await updateContacts(contacts);

//   return contacts[index];
// }
