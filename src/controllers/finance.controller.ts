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

  async delete(req: Request, res: Response) {
    const id = +req.params.id;

    if (!id) {
      throw new Error("Id não informado");
    }
    const deleteFinance = await financeService.delete(id);
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
}

export default new FinanceController();
