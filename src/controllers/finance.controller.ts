import financeService from "../services/finance.service";
import { Request, Response } from "express";
class FinanceController {
  async create(req: Request, res: Response): Promise<void> {
    const { description, ocurenceDate, typeValue, money } = req.body;
    const email = req.user.email;
    if (!description || !ocurenceDate || !typeValue || !money) {
      throw new Error("Campos obrigatórios");
    }

    const newFinance = await financeService.create(
      description,
      ocurenceDate,
      typeValue,
      money,
      email
    );
    res.status(200).json(newFinance);
    return;
  }
}

export default new FinanceController();
