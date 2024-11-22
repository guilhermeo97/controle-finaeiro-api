import "reflect-metadata";
import express from "express";
import mainRouter from "../src/routes/index";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error/error";

dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE);

const server = express();

server.use(express.json());
server.use("/", mainRouter);
server.use(errorMiddleware);

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
