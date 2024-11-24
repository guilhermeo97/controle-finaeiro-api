import { AppDataSource } from "../data-source";
import CreateFinanceDTO from "../dto/createfinancedto";
import DisplayFinanceDTO from "../dto/displayfinancedto";
import { DisplayUserDTO } from "../dto/displayuserdto";
import ModifyinanceDTO from "../dto/modifyfinancedto";
import Finance from "../entities/finance";
import userService from "./user.service";

class FinanceService {
  private financeRepository = AppDataSource.getRepository(Finance);

  async create(dto: CreateFinanceDTO, email: string) {
    const findUser = await userService.findUserByEmail(email);
    if (!findUser) {
      return null;
    }
    const displayUser = new DisplayUserDTO(findUser.name, findUser.email);
    const newFinance = new Finance(
      dto.description,
      dto.ocurenceDate,
      dto.typeValue,
      dto.money,
      findUser
    );

    const displayFinance = new DisplayFinanceDTO(
      dto.description,
      dto.ocurenceDate,
      dto.typeValue,
      dto.money,
      displayUser
    );

    const saveFinance = await this.financeRepository.save(newFinance);
    if (!saveFinance) {
      return null;
    }

    return displayFinance;
  }

  async delete(id: number, email: string) {
    const findUser = await userService.findUserByEmail(email);
    if (!findUser) {
      return null;
    }
    const findFinance = await this.findOne(id);
    if (!findFinance) {
      return null;
    }

    if (findUser.id !== findFinance.user.id) {
      return null;
    }

    const deleteFinance = await this.financeRepository.delete(id);
    if (!deleteFinance) {
      return null;
    }
    return deleteFinance;
  }

  async findOne(financeId: number) {
    const findFinance = await this.financeRepository.findOne({
      where: { id: financeId },
    });
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
    const displayUser = new DisplayUserDTO(findUser.name, findUser.email);

    const findFinances = await this.financeRepository.find({
      where: { user: { id: findUser.id } },
    });

    if (findFinances.length === 0) {
      return null;
    }

    const listFinances = findFinances.map((finance) => {
      return new DisplayFinanceDTO(
        finance.description,
        finance.ocurenceDate,
        finance.typeValue,
        finance.money,
        displayUser
      );
    });

    return listFinances;
  }

  async modifyOneFinance(
    financeId: number,
    dto: ModifyinanceDTO,
    email: string
  ) {
    const findUser = await userService.findUserByEmail(email);
    if (!findUser) {
      return null;
    }

    const findFinance = await this.findOne(financeId);
    if (!findFinance) {
      return null;
    }

    if (findUser.id !== findFinance.user.id) {
      return null;
    }

    const displayUser = new DisplayUserDTO(findUser.name, findUser.email);

    findFinance.description = dto.description ?? findFinance.description;
    findFinance.ocurenceDate = dto.ocurenceDate ?? findFinance.ocurenceDate;
    findFinance.typeValue = dto.typeValue ?? findFinance.typeValue;
    findFinance.money = dto.money ?? findFinance.money;

    const modifyFinance = await this.financeRepository.save(findFinance);
    if (!modifyFinance) {
      return null;
    }
    const displayFinance = new DisplayFinanceDTO(
      modifyFinance.description,
      modifyFinance.ocurenceDate,
      modifyFinance.typeValue,
      modifyFinance.money,
      displayUser
    );

    return displayFinance;
  }
}

export default new FinanceService();
