import { Router } from "express";
import {
  agregateEvent,
  deleteEvent,
  getAllEvents,
  getIdEvent,
  getMyEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateEvenValidation,
  deleteEventValidation,
  idEventValidation,
  updateEvenValidation,
} from "../middlewares/validation/event.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
export const eventRouter = Router();

eventRouter.post(
  "/events",
  authMiddleware,
  agregateEvenValidation,
  validate,
  agregateEvent,
);
eventRouter.get("/events", authMiddleware, getAllEvents);
eventRouter.get("/events/my", authMiddleware, getMyEvents);
eventRouter.get(
  "/events/:id",
  authMiddleware,
  idEventValidation,
  validate,
  getIdEvent,
);
eventRouter.put(
  "/events/:id",
  authMiddleware,
  updateEvenValidation,
  validate,
  ownerOrAdminMiddleware,
  updateEvent,
);
eventRouter.delete(
  "/events/:id",
  authMiddleware,
  deleteEventValidation,
  validate,
  ownerOrAdminMiddleware,
  deleteEvent,
);
