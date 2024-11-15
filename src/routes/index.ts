import express from "express";
import financasRouter from "./financas";
import userRouter from "./users";
const router = express.Router();

router.use("/tasks", financasRouter);
router.use("/users", userRouter);

export default router;
