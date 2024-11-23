import financeService from "../services/finance.service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/apperror";
class FinanceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { description, ocurenceDate, typeValue, money } = req.body;
      const email = req.user.email;

      if (!email) {
        throw new AppError("Acesso negado", 401);
      }
      if (!description || !ocurenceDate || !typeValue || !money) {
        throw new AppError("Campos obrigatórios", 400);
      }

      const newFinance = await financeService.create(
        description,
        ocurenceDate,
        typeValue,
        money,
        email
      );
      res.status(201).json(newFinance);
    } catch (err) {
      next(err);
    }

    return;
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const email = req.user.email;
      const financeId = +req.params.userId;

      if (!email) {
        throw new AppError("Acesso negado", 401);
      }

      if (!financeId) {
        throw new AppError("Finança não informado", 400);
      }
      const deleteFinance = await financeService.delete(financeId, email);
      if (!deleteFinance) {
        throw new AppError("Finança não encontrada!", 404);
      }
      res.status(204).send();
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
      if (!email) {
        throw new AppError("Acesso negado!", 401);
      }
      const findFinances = await financeService.findAllByUser(email);
      if (!findFinances) {
        throw new AppError("Finanças não encontradas", 404);
      }
      res.status(200).json(findFinances);
    } catch (err) {
      next(err);
    }
  }

  async modifyOneFinance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const financeId = +req.params.id;
      const email = req.user.email;
      if (!email) {
        throw new AppError("Acesso negado!", 401);
      }
      if (!financeId) {
        throw new AppError("Finança não informada", 400);
      }
      const { description, ocurenceDate, typeValue, money, user } = req.body;
      const newFinance = await financeService.modifyOneFinance(
        financeId,
        description,
        ocurenceDate,
        typeValue,
        money,
        email
      );
      if (!newFinance) {
        throw new AppError("Finança não encontrada", 404);
      }
      res.status(200).json(newFinance);
    } catch (err) {
      next(err);
    }
  }

  async findOneFinance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const financeId = +req.params.id;
      const email = req.user.email;
      if (!financeId || !email) {
        throw new AppError("Acesso negado!", 401);
      }

      const findOneFinance = await financeService.findOne(financeId);
      if (!findOneFinance) {
        throw new AppError("Finança não encontrada", 404);
      }
      res.status(200).json(findOneFinance);
    } catch (err) {
      next(err);
    }
  }
}

export default new FinanceController();
