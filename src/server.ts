import express from "express";
import mainRouter from "../src/routes/index";
import taskRouter from "../src/routes/tasks";
import userRouter from "../src/routes/users";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import User from "./entities/user.entity.";
import Task from "./entities/task.entity";
dotenv.config();

const server = express();

server.use(express.json());

server.use("/", mainRouter);
server.use("/tasks", taskRouter);
server.use("/", userRouter);
server.use("/", userRouter);

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Use com cautela em produção
  logging: true,
  entities: [User, Task],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    server.listen(parseInt(process.env.DB_PORT as string), () => {
      console.log(`Server is running on port ${process.env.DB_PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to the database:", error));
