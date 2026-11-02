import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { login, register } from "../controllers/auth.controller.js";
import { agregateUserValidation } from "../middlewares/validation/user.validation.js";
import { loginValidation } from "../middlewares/validation/auth.validation.js";

export const authRouter = Router();

authRouter.post("/auth/register", agregateUserValidation, validate, register);
authRouter.post("/auth/login", loginValidation, validate, login);
