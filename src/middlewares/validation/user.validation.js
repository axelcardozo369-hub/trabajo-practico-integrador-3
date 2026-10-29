import { body, param } from "express-validator";
import { validate } from "../validate.js";
import { UserModel } from "../../models/user.model.js";
export const agregateUserValidation = [
  body("username")
    .notEmpty()
    .withMessage("el username debe ser obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("debe ser al menos de 3 o 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("solo debe ser entre caracteres y números")
    .bail()
    .custom(async (username) => {
      const usernameExiste = await UserModel.findOne({ username });
      if (usernameExiste) {
        throw new Error("no puedes agregar un mismo username registrado ");
      }
    }),
  body("profile").notEmpty().withMessage("el profile debe ser obligatorio"),
  body("profile.firstName")
    .notEmpty()
    .withMessage("el firstName debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 }),
  body("profile.lastName")
    .notEmpty()
    .withMessage("el lastname debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 }),
  body("profile.birthDate")
    .optional()
    .notEmpty()
    .withMessage("el birthDate debe ser obligatorio")
    .bail()
    //*investigando encontre asi una forma de poder hacer la fecha de forma YYYY-MM-DD
    .isISO8601()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)"),
  body("phone")
    .notEmpty()
    .optional()
    .withMessage("el phone debe ser obligatorio"),
  body("email")
    .notEmpty()
    .withMessage("el email debe ser obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido")
    .bail()
    .custom(async (email) => {
      const emailExiste = await UserModel.findOne({ email });
      if (emailExiste) {
        throw new Error(
          "el email que quieres registrar ya esta en la base de datos ",
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("el password debe ser obligatorio")
    .bail()
    .isLength({ min: 8 })
    .withMessage("el password debe ser al menos de 8 digitos ")
    .bail()
    //aqui aplique de forma investigativa que el password deberia ser de almenos una mayuscula, minuscula y un numero
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "la password debe contener al menos una mayuscula ,una minúscula y un número ",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("el role deber ser  al menos user o admin "),
];
export const updateUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (user) => {
      const userExiste = await UserModel.findOne({ _id: user });
      if (!userExiste) {
        throw new Error(
          "el usuario que quieres editar no existe en la base de datos",
        );
      }
    }),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("el username debe ser obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("debe ser al menos de 3 o 20 caracteres")
    .bail()
    // *busca por un id que si un usuario tiene un mismo nombre
    // *no cambia el username pero si en el caso no hay un
    // *username usado,lo que pasará es cambiarse al username nuevo
    .isAlphanumeric()
    .withMessage("el username debe ser entre caracteres y numeros ")
    .bail()
    .custom(async (username, { req }) => {
      const otroUsuario = await UserModel.findOne({
        username: username,
        _id: { $ne: req.params.id },
      });
      if (otroUsuario) {
        throw new Error(
          "el username que quieres editar ya tiene uso hacia otro usuario",
        );
      }
    }),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("el email debe ser obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("el password debe ser obligatorio")
    .bail()
    .isLength({ min: 8 })
    .withMessage("el password debe ser al menos de 6 a 10 digitos ")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "la password debe contener al menos una mayuscula ,una minúscula y un número ",
    ),
  body("profile")
    .optional()
    .notEmpty()
    .withMessage("el profile debe ser obligatorio"),
  body("profile.firstName")
    .optional()
    .notEmpty()
    .withMessage("el firstName debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 }),
  body("profile.lastName")
    .optional()
    .notEmpty()
    .withMessage("el lastname debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 }),
  body("profile.birthDate")
    .optional()
    .notEmpty()
    .withMessage("el birthDate debe ser obligatorio")
    .bail()
    //*investigando encontre asi una forma de poder hacer la fecha de forma YYYY-MM-DD
    .isISO8601()
    .optional()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)"),
  body("phone")
    .optional()
    .notEmpty()
    .withMessage("el phone debe ser obligatorio"),
];
export const deleteUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const idExiste = await UserModel.findOne({ _id: id });
      if (!idExiste) {
        throw new Error("el id que quieres eliminar no existe");
      }
    }),
];
