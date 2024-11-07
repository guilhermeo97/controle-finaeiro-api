import express from "express";
import mainRouter from "../src/routes/index";
import taskRouter from "../src/routes/tasks";
import userRouter from "../src/routes/users";
import { configDotenv } from "dotenv";

configDotenv();

const server = express();
const port = 3000;

server.use(express.json());

server.use("/", mainRouter);
server.use("/tasks", taskRouter);
server.use("/", userRouter);
server.use("/", userRouter);

server.listen(port, () => {
  console.log(`Servidor em execução na porta: ${port}`);
});
