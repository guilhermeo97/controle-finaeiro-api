import { Router } from "express";
import UserController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth/auth";

const router = Router();

router.get("/", verifyToken, UserController.findAll);
router.post("/cadastrar", UserController.create);
router.post("/login", UserController.login);

export default router;
