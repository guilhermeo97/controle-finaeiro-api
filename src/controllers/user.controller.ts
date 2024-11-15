import User from "../entities/user";
import UserService from "../services/user.service";
import { Request, Response } from "express";

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    try {
      const user = await UserService.create(name, email, password);
      res.status(201).json(user);
    } catch {
      res.status(400).json({ message: "Error creating user" });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch {
      res.status(400).json({ message: "Error list users" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await UserService.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(400).json({ message: "Invalid credentials" });
    }
  }
}
export default new UserController();
