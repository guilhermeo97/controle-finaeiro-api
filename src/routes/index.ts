import express from "express";
import financeRouter from "./finance";
import userRouter from "./users";
const router = express.Router();

router.use("/finance", financeRouter);
router.use("/users", userRouter);

export default router;
