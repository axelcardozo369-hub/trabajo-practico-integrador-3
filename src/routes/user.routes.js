import { Router } from "express";
import {
  agregateUser,
  deleteUser,
  getAllUsers,
  getIdUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateUserValidation,
  deleteUserValidation,
  getIdUserValidation,
  updateUserValidation,
} from "../middlewares/validation/user.validation.js";

export const userRouter = Router();

userRouter.post("/user", agregateUserValidation, validate, agregateUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:id", getIdUserValidation, validate, getIdUser);
userRouter.put("/user/:id", updateUserValidation, validate, updateUser);
userRouter.delete("/user/:id", deleteUserValidation, validate, deleteUser);
