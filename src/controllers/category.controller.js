import { matchedData, validationResult } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import { EventModel } from "../models/event.model.js";

export const agregateCategory = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newCategory = await CategoryModel.create(validationData);

    return res
      .status(201)
      .json({ message: "category agregada", data: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const getAllCategorys = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate({
      path: "events",
      populate: {
        path: "organizer",
        select: "-password",
      },
    });

    return res
      .status(200)
      .json({ message: "estos son todas las categories", data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const updateCategory = await CategoryModel.findByIdAndUpdate(
      id,
      validationData,
      {
        returnDocument: "after",
      },
    );
    return res
      .status(200)
      .json({ message: "category actualizada", data: updateCategory });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    //* borro la coleccion de categoria
    await CategoryModel.deleteOne({ _id: id });
    //*acá borro en cascada a los eventos que tenian la categoria
    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );
    return res
      .status(200)
      .json({ message: "category eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor " });
  }
};
export const getIdCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const idCategory = await CategoryModel.findOne({
      _id: id,
    }).populate({
      path: "events",
      populate: {
        path: "organizer",
        select: "-password",
      },
    });

    return res
      .status(200)
      .json({ message: "category encontrada", data: idCategory });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};
