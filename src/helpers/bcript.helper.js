import bcrypt from "bcryptjs";

//?hasheo mi password
export const hashPassword = async (password) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);

  return hashedPassword;
};

//? Verifico mi password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
