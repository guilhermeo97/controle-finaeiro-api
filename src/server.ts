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
const serverPort = 8080;

server.use(express.json());
server.use("/", mainRouter);
server.use(errorMiddleware);

process.on("uncaughtException", (err) => {
  console.error("Erro não capturado:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Rejeição não tratada:", reason);
  process.exit(1);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    server.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
