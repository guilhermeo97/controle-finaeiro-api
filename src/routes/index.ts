import express from "express";
import taskRouter from "./tasks";
import userRouter from "./users";
const router = express.Router();

router.use("/tasks", taskRouter);
router.use("/users", userRouter);

export default router;
