import express from "express";
import "dotenv/config";
import { dataBaseMongoose } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { categoryRouter } from "./src/routes/category.routes.js";
import { eventRouter } from "./src/routes/event.routes.js";
import { UserModel } from "./src/models/user.model.js";
import { EventModel } from "./src/models/event.model.js";
import { authRouter } from "./src/routes/auth.routes.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);

app.listen(PORT, async () => {
  console.log(`Server funcionando`);
  console.log(`PUERTO ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
dataBaseMongoose();
