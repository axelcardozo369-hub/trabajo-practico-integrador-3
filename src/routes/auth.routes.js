import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { register } from "../controllers/auth.controller.js";
import { agregateUserValidation } from "../middlewares/validation/user.validation.js";

export const authRouter = Router();

authRouter.post("/auth/register", agregateUserValidation, validate, register);
