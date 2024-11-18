import { AppDataSource } from "../data-source";
import { TypeValue } from "../entities/enums/TypeValue";
import Finance from "../entities/finance";
import userService from "./user.service";

class FinanceService {
  private financeRepository = AppDataSource.getRepository(Finance);

  async create(
    description: string,
    ocurenceDate: Date,
    typeValue: TypeValue,
    money: number,
    email: string
  ) {
    const findUser = await userService.findUserByEmail(email);
    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }
    const newFinance = new Finance(
      description,
      ocurenceDate,
      typeValue,
      money,
      findUser
    );
    return await this.financeRepository.save(newFinance);
  }

  async delete(id: number) {
    const findFinance = await this.findOne(id);
    if (!findFinance) {
      return null;
    }
    return await this.financeRepository.delete(id);
  }

  async findOne(id: number) {
    const findFinance = await this.financeRepository.findOne({ where: { id } });
    if (!findFinance) {
      return null;
    }
    return findFinance;
  }

  async findAllByUser(email: string) {
    const findUser = await userService.findUserByEmail(email);
    if (!findUser) {
      return null;
    }

    const findFinances = await this.financeRepository.find({
      where: { user: { id: findUser.id } },
    });

    if (findFinances.length === 0) {
      return null;
    }

    return findFinances;
  }
}

export default new FinanceService();
