import UserService from "../services/user.service";
import { Request, Response } from "express";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      const user = await UserService.create(name, email, password);
      return res.status(201).json(user);
    } catch {
      return res.status(400).json({ message: "Error creating user" });
    }
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.findAll();
      return res.status(200).json(users);
    } catch {
      return res.status(400).json({ message: "Error list users" });
    }
  }
}
export default new UserController();
