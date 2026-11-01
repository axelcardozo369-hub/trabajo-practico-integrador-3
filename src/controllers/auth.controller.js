import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../helpers/bcript.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    //! Saco las datos que el usuario se registre
    const { username, email, password, profile } = matchedData(req, {
      locations: ["body"],
    });

    //!Hago el hasheo de la contraseña
    const hashedPassword = await hashPassword(password);

    //!creo el nuevo usuario que se registra
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      profile: profile,
    });
    return res.status(201).json({ message: "usuario registrado con exito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor " });
  }
};
