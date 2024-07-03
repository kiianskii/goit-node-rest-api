import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as contactsService from "../services/contactsServices.js";
import getFilterByOwner from "../helpers/getFilterByOwner.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const filter = {
    owner,
  };

  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const result = await contactsService.listContacts({ filter, settings });

  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const filter = getFilterByOwner(req);
  const result = await contactsService.getContactById(filter);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const filter = getFilterByOwner(req);

  const result = await contactsService.removeContact(filter);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: result,
  });
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const filter = getFilterByOwner(req);
  const result = await contactsService.updateContactById(filter, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
  s;
};

const updateStatusContact = async (req, res) => {
  const filter = getFilterByOwner(req);
  const result = await contactsService.updateStatusContact(filter, req.body);
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
