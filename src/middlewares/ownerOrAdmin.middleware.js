import { EventModel } from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "evento no encontrado" });
    }
    //?sobre quien creo el evento
    const esOrganizador = event.organizer.toString() === req.user.idUser;
    //? si es admin o no
    const esAdmin = req.user.role === "admin";
    //? si no ninguno de los dos
    if (!esOrganizador && !esAdmin) {
      return res
        .status(403)
        .json({ message: "no tenes permiso para modificar este evento" });
    }
    //? si por ahi es uno de los dos ---> pasa
    next();
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
