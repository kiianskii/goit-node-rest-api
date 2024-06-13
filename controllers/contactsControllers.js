import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as contactsService from "../services/contactsServices.js";

const getAllContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();

  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById({ _id: id });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact({ _id: id });
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: result,
  });
};

const createContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.updateContactById({ _id: id }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
  s;
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateStatusContact(
    { _id: id },
    req.body
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
