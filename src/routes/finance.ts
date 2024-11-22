import { Router } from "express";
import { verifyToken } from "../middleware/auth/auth";
import FinanceController from "../controllers/finance.controller";

const router = Router();

router.post("/", verifyToken, FinanceController.create);
router.delete("/:id", verifyToken, FinanceController.delete);
router.get("/", verifyToken, FinanceController.findAll);
router.get("/:id", verifyToken, FinanceController.findOneFinance);
router.put("/:id", verifyToken, FinanceController.modifyOneFinance);

export default router;
