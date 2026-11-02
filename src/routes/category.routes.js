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
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  agregateCategoryValidation,
  validate,
  agregateCategory,
);
categoryRouter.get("/categories", authMiddleware, getAllCategorys);
categoryRouter.get(
  "/categories/:id",
  authMiddleware,
  idCategoryValidation,
  validate,
  getIdCategory,
);
categoryRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategoryValidation,
  validate,
  updateCategory,
);
categoryRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategoryValidation,
  validate,
  deleteCategory,
);
