import { TypeValue } from "../entities/enums/TypeValue";
import { DisplayUserDTO } from "./displayuserdto";

export default class DisplayFinanceDTO {
  description: string;

  ocurenceDate: Date;

  typeValue: TypeValue;

  money: number;

  user: DisplayUserDTO;

  constructor(
    description: string,
    ocurence_date: Date,
    typeValue: TypeValue,
    money: number,
    user: DisplayUserDTO
  ) {
    this.description = description;
    this.ocurenceDate = ocurence_date;
    this.typeValue = typeValue;
    this.money = money;
    this.user = user;
  }
}
