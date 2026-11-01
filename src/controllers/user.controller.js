import { matchedData, validationResult } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";
export const agregateUser = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newUser = await UserModel.create(validationData);
    return res
      .status(201)
      .json({ message: "user agregado con exito", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");
    return res
      .status(200)
      .json({ message: "estos son todos los usuarios", data: users });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const updateUser = await UserModel.findByIdAndUpdate(id, validationData, {
      returnDocument: "after",
    });
    return res
      .status(200)
      .json({ message: "user actualizado con exito", updateUser });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ _id: id, deletedAt: null });

    //*elimino de forma logica
    await UserModel.findByIdAndUpdate(id, { deletedAt: new Date() });
    //*elimino en forma de cascada que seria de borrar un usuario
    //* y todos sus eventos
    await EventModel.deleteMany({ organizer: id });

    return res.status(200).json({ message: "user borrado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor " });
  }
};
export const getIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    })
      .select("-password")
      .populate("events");
    return res.status(200).json({ message: "user encontrado", data: idUser });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};
