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
    const findUser = await userService.findOne(email);
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
}

export default new FinanceService();
