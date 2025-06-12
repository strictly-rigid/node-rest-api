import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema,
  contactUpdateFavoriteSchema,
} from "../models/contacts/Contact.js";

import { validateBody } from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactAddValidate = validateBody(createContactSchema);
const contactUpdateValidate = validateBody(updateContactSchema);
const contactUpdateFavorite = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", isValidId, contactAddValidate, createContact);

contactsRouter.put("/:id", isValidId, contactUpdateValidate, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavorite,
  updateContact
);

export default contactsRouter;
