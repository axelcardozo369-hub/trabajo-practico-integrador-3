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
export const updateProfileValidation = [
  body("firstName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("el firstName debe tener entre 2 y 50 caracteres")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("el firstName solo puede tener letras"),

  body("lastName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("el lastName debe tener entre 2 y 50 caracteres")
    .bail()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("el lastName solo puede tener letras"),

  body("birthDate")
    .optional()
    .isISO8601()
    .withMessage("la fecha debe ser valida (YYYY-MM-DD)")
    .bail()
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("la fecha de nacimiento no puede ser futura");
      }
      return true;
    }),

  body("phone")
    .optional()
    .isNumeric()
    .withMessage("el phone solo puede tener numeros")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("el phone debe tener entre 8 y 15 digitos"),
];
