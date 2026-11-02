import { body, matchedData } from "express-validator";
import { validate } from "../validate.js";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("el email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido"),
  body("password").notEmpty().withMessage("el password es obligatorio"),
];
