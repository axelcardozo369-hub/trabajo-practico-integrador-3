import { matchedData, validationResult } from "express-validator";
import { EventModel } from "../models/event.model.js";
export const agregateEvent = async (req, res) => {
  try {
    const validationData = matchedData(req, { locations: ["body"] });
    const newEvent = await EventModel.create({
      ...validationData,
      organizer: req.user.idUser,
    });
    return res
      .status(201)
      .json({ message: "evento agregado con exito", newEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const eventos = await EventModel.find({}).populate(
      "organizer categories",
      "-password",
    );

    return res
      .status(200)
      .json({ message: "estos son todos los eventos", data: eventos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const validationData = matchedData(req, { locations: ["body"] });
    const updateEvent = await EventModel.findByIdAndUpdate(id, validationData, {
      returnDocument: "after",
    });
    return res
      .status(200)
      .json({ message: "event actualizado con exito", updateEvent });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await EventModel.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "evento borrado con exito", data: deleteEvent });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
export const getIdEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const idEvent = await EventModel.findOne({ _id: id }).populate(
      "organizer categories",
      "-password",
    );
    return res.status(200).json({ message: "event encontrado", data: idEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
