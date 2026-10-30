import { body, param } from "express-validator";
import { validate } from "../validate.js";
import { EventModel } from "../../models/event.model.js";
import { CategoryModel } from "../../models/category.model.js";

export const agregateEvenValidation = [
  body("title")
    .notEmpty()
    .withMessage("el title debe ser obligatorio")
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage("el title debe ser de al minimo 3 y maximo 150")
    .bail()
    .custom(async (title) => {
      const titleExiste = await EventModel.findOne({ title });
      if (titleExiste) {
        throw new Error(
          "No puedes agregar un mismo title que ya se encuentra en la base de datos",
        );
      }
    }),
  body("description")
    .notEmpty()
    .withMessage("la description debe ser obligatorio")
    .bail()
    .isLength({ min: 20 })
    .withMessage("la description debe ser de minimo 20 caracteres"),
  body("startDate")
    .notEmpty()
    .withMessage("el startDate debe ser obligatorio")
    .bail()
    .isISO8601()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)")
    .bail(),
  body("endDate")
    .notEmpty()
    .withMessage("el endDate debe ser obligatorio")
    .bail()
    .isISO8601()
    .withMessage("endDate debe ser una fecha válida por ejemplo (2026-11-05)")
    .bail()
    .custom((endDate, { req }) => {
      const fechaInicio = new Date(req.body.startDate);
      const fechaFin = new Date(endDate);
      if (fechaFin <= fechaInicio) {
        throw new Error("el endDate debe ser posterior al startDate");
      }
      return true;
    }),

  body("capacity")
    .notEmpty()
    .withMessage("capacity es obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("debe ser al menos un 1 numero"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("el price debe ser mayor o igual a 0"),
  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage(
      "el status debe ser al menos: scheduled, cancelled o finished",
    ),
  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser una lista")
    .bail()
    .custom(async (categories) => {
      const categoryEncontrada = await CategoryModel.find({
        _id: { $in: categories },
      });
      if (categoryEncontrada.length !== categories.length) {
        throw new Error("algunas de las categorias no existe ");
      }
    }),
  body("categories.*").isMongoId().withMessage("el id debe ser valido"),
  body("location").notEmpty().withMessage("la location debe ser obligatorio"),
  body("location.venue")
    .notEmpty()
    .withMessage("venue debe ser obligatorio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("venue debe ser al menos de 3 minimo o maximo 100 caracteres"),
  body("location.address")
    .notEmpty()
    .withMessage("address debe ser obligatorio")
    .bail()
    .isLength({ min: 5, max: 150 })
    .withMessage("address debe ser al menos minimo 5 y maximo 150"),
  body("location.city")
    .notEmpty()
    .withMessage("el city debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("city debe ser almenos minimo 2 o maximo 50 caracteres "),
];

export const updateEvenValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const idExiste = await EventModel.findOne({ _id: id });
      if (!idExiste) {
        throw new Error("el id que quieres editar no existe");
      }
    }),

  body("title")
    .optional()
    .notEmpty()
    .withMessage("title obligatorio")
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage("el title debe ser minimo 3 o 150 caracteres")
    .bail()
    .custom(async (title, { req }) => {
      const titleOcupado = await EventModel.findOne({
        title,
        _id: { $ne: req.params.id },
      });
      if (titleOcupado) {
        throw new Error(
          "no puede usar ese mismo title ya que es ocupada por otro evento",
        );
      }
    }),
  body("description")
    .optional()
    .isLength({ min: 20 })
    .withMessage("la description debe ser al menos de 20 caracteres"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Formato de fecha inválido (YYYY-MM-DD)"),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("endDate debe ser una fecha válida por ejemplo (2026-11-05)")
    .bail()
    .custom((endDate, { req }) => {
      const fechaInicio = new Date(req.body.startDate);
      const fechaFin = new Date(endDate);
      if (fechaFin <= fechaInicio) {
        throw new Error("el endDate debe ser posterior al startDate");
      }
      return true;
    }),
  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("la capacidad debe almenos un caracter"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("el price debe ser mayor a 0"),

  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("el status debe ser menos scheduled, cancelled o finished"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser una lista")
    .bail()
    .custom(async (categorie) => {
      const categoryEncontrada = await CategoryModel.find({
        _id: { $in: categorie },
      });
      if (categoryEncontrada.length !== categorie.length) {
        throw new Error("algunas de las categorias no existe ");
      }
    }),

  body("categories.*").isMongoId().withMessage("el id debe ser valido "),

  body("location.venue")
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "venue debe ser de caracteres minimo como 3 o maximo como 100",
    ),

  body("location.address")
    .optional()
    .isLength({ min: 5, max: 150 })
    .withMessage("address debe ser almenso de 5 o 150 caracteres"),

  body("location.city")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("el city debe ser al menos de 2 a 50 maximo de caracteres"),
];
export const deleteEventValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const eventoExiste = await EventModel.findOne({ _id: id });
      if (!eventoExiste) {
        throw new Error("el evento que quieres eliminar no existe");
      }
    }),
];
