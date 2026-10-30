import { body, param } from "express-validator";
import { validate } from "../validate.js";
import { CategoryModel } from "../../models/category.model.js";
export const agregateCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("el name no debe ser vacio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("el name debe estar compuesta por 2 minimo o 30 caracteres")
    .bail()
    .custom(async (name) => {
      const nameExiste = await CategoryModel.findOne({ name });
      if (nameExiste) {
        throw new Error(
          "no puedes agregar un mismo name que ya se encuentra en la base de datos",
        );
      }
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("la description seria ya de 200 caracteres"),
];

export const updateCategoryValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const idExiste = await CategoryModel.findOne({ id });
      if (!idExiste) {
        throw new Error("no se encuentra esta id");
      }
    }),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("el name debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "el name debe ser almenos de lo minimo en 2 o maxima 30 caracteres",
    )
    .bail()
    .custom(async (name, { req }) => {
      const nameExiste = await CategoryModel.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (nameExiste) {
        throw new Error("no puedes editar a una name que ya es usado ");
      }
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("la description debe ser almenos 200 caracteres"),
];
export const deleteCategoryValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const categorieExiste = await CategoryModel.findOne({ _id: id });
      if (!categorieExiste) {
        throw new Error("la categoria que quieres borrar no existe");
      }
    }),
];
