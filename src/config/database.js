import mongoose from "mongoose";

export const dataBaseMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("conexion de base de datos con exito");
  } catch (error) {
    console.error(`no se pudo conectar con la base de datos`, error.message);
  }
};
