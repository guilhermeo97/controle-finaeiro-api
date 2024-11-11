import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/", UserController.findAll as any);
router.post("/", UserController.create as any);
export default router;
