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
export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const userExiste = await UserModel.findOne({ email, deletedAt: null });
    if (!userExiste) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }
    const validPassword = await comparePassword(password, userExiste.password);
    if (!validPassword) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }

    //!Genero el token
    const token = generateToken({
      idUser: userExiste.id,
      role: userExiste.role,
    });

    //!Envio el token como cookie

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 10,
    });
    return res.status(200).json({ message: "usuario logueado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error interno de servidor" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const profile = await UserModel.findOne({
      _id: req.user.idUser,
      deletedAt: null,
    }).select("-password");

    return res
      .status(200)
      .json({ message: "este es el perfil ", data: profile });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor " });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Eliminar cookie del navegador
    return res.json({ message: "Logout exitoso" });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
