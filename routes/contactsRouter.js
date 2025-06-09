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
} from "../schemas/contactsSchemas.js";

import { validateBody } from "../decorators/validateBody.js";

const contactAddValidate = validateBody(createContactSchema);
const contactUpdateValidate = validateBody(updateContactSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", contactAddValidate, createContact);

contactsRouter.put("/:id", contactUpdateValidate, updateContact);

export default contactsRouter;
