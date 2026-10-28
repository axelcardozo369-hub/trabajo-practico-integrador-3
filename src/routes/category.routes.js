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
  updateCategoryValidation,
} from "../middlewares/validation/category.validation.js";

export const categoryRouter = Router();

categoryRouter.post(
  "categorys",
  agregateCategoryValidation,
  validate,
  agregateCategory,
);
categoryRouter.get("categorys", getAllCategorys);
categoryRouter.get("categorys/:id", getIdCategory);
categoryRouter.put(
  "categorys",
  updateCategoryValidation,
  validate,
  updateCategory,
);
categoryRouter.delete(
  "categorys",
  deleteCategoryValidation,
  validate,
  deleteCategory,
);
