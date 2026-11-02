import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getIdUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  deleteUserValidation,
  getIdUserValidation,
  updateUserValidation,
} from "../middlewares/validation/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);
userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  getIdUserValidation,
  validate,
  getIdUser,
);
userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser,
);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserValidation,
  validate,
  deleteUser,
);
