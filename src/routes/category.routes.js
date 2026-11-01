import { Router } from "express";
import {
  agregateCategory,
  deleteCategory,
  getAllCategorys,
  getIdCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateCategoryValidation,
  deleteCategoryValidation,
  idCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/validation/category.validation.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  agregateCategoryValidation,
  validate,
  agregateCategory,
);
categoryRouter.get("/categories", getAllCategorys);
categoryRouter.get(
  "/categories/:id",
  idCategoryValidation,
  validate,
  getIdCategory,
);
categoryRouter.put(
  "/categories/:id",
  updateCategoryValidation,
  validate,
  updateCategory,
);
categoryRouter.delete(
  "/categories/:id",
  deleteCategoryValidation,
  validate,
  deleteCategory,
);
