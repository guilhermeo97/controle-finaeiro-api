import express from "express";
import mainRouter from "../src/routes/index";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import User from "../src/entities/user";
import Task from "./entities/task";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE);

const server = express();

server.use(express.json());
server.use("/", mainRouter);

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Task],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const serverPort = parseInt(process.env.SERVER_PORT || "3000");

    server.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
