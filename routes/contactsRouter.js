import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import isEmptyBody from "../helpers/emptyBodyCheck.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../helpers/idValid.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  isEmptyBody,
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  isValidId,
  isEmptyBody,
  updateContact
);

export default contactsRouter;
