import financeService from "../services/finance.service";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/apperror";
class FinanceController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { description, ocurenceDate, typeValue, money } = req.body;
      const email = req.user.email;
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
      res.status(200).json(newFinance);
    } catch (err) {
      next(err);
    }

    return;
  }

  async delete(req: Request, res: Response) {
    const userId = +req.params.userId;

    if (!userId) {
      throw new Error("Id não informado");
    }
    const deleteFinance = await financeService.delete(userId);
    if (!deleteFinance) {
      res.status(404).send();
      return;
    }
    res.status(204).send();
    return;
  }

  async findAll(req: Request, res: Response) {
    const email = req.user.email;
    const findFinances = await financeService.findAllByUser(email);
    if (!findFinances) {
      res.status(204).send();
      return;
    }
    res.status(200).json(findFinances);
  }

  async modifyOneFinance(req: Request, res: Response) {
    const financeId = +req.params.id;
    const email = req.user.email;
    if (!financeId || !email) {
      res.status(403).json("Acesso negado!");
      return;
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
      res.status(404).send();
      return;
    }
    res.status(200).json(newFinance);
    return;
  }

  async findOneFinance(req: Request, res: Response) {
    const financeId = +req.params.id;
    const email = req.user.email;
    if (!financeId || !email) {
      res.status(403).json("Acesso negado!");
      return;
    }

    const findOneFinance = await financeService.findOne(financeId);
    if (!findOneFinance) {
      res.status(203).json("Item não encontrado");
      return;
    }
    res.status(200).json(findOneFinance);
    return;
  }
}

export default new FinanceController();
