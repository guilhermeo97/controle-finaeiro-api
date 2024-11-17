import { Router } from "express";
import { verifyToken } from "../auth/auth";
import FinanceController from "../controllers/finance.controller";

const router = Router();

//router.get("/", verifyToken, FinanceController);
router.post("/", verifyToken, FinanceController.create);
//router.post("/login");

export default router;
