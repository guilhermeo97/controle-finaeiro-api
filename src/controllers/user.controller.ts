import UserService from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/apperror";
import { nextTick } from "process";

class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new AppError("Campos obrigatórios", 400);
      }
      const user = await UserService.create(name, email, password);
      if (!user) {
        throw new AppError("Erro ao criar usuário", 500);
      }
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = req.user.email;
      const users = await UserService.findAll(email);
      if (!users) {
        throw new AppError("Nenhum item encontrado", 204);
      }
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || password) {
        throw new AppError("Campos obrigatórios", 400);
      }
      const user = await UserService.login(email, password);
      if (!user) {
        throw new AppError("Credenciais inválidas", 401);
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}
export default new UserController();
