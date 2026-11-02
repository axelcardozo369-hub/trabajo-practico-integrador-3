import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { agregateUserValidation } from "../middlewares/validation/user.validation.js";
import { loginValidation } from "../middlewares/validation/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const authRouter = Router();
authRouter.post("/auth/register", agregateUserValidation, validate, register);
authRouter.post("/auth/login", loginValidation, validate, login);
authRouter.post("/auth/logout", authMiddleware, logout);
authRouter.get("/auth/profile", authMiddleware, getProfile);
