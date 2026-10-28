import { Router } from "express";
import {
  agregateEvent,
  deleteEvent,
  getAllEvents,
  getIdEvent,
  updateEvent,
} from "../controllers/event.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateEvenValidation,
  deleteEventValidation,
  updateEvenValidation,
} from "../middlewares/validation/event.validation.js";

export const eventRouter = Router();

eventRouter.post("events", agregateEvenValidation, agregateEvent);
eventRouter.get("events", getAllEvents);
eventRouter.get("events/:id", getIdEvent);
eventRouter.put("events", updateEvenValidation, validate, updateEvent);
eventRouter.delete("events", deleteEventValidation, validate, deleteEvent);
