import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TypeValue } from "../entities/enums/TypeValue";

export default class CreateFinanceDTO {
  @IsNotEmpty({ message: "A descrição é obrigatória" })
  description: string;
  @IsDateString()
  ocurenceDate: Date;
  @IsEnum(TypeValue, { message: "Tipo incorreto" })
  typeValue: TypeValue;
  @IsNumber()
  @IsNotEmpty({ message: "A descrição é obrigatória" })
  money: number;

  constructor(
    description: string,
    ocurence_date: Date,
    typeValue: TypeValue,
    money: number
  ) {
    this.description = description;
    this.ocurenceDate = ocurence_date;
    this.typeValue = typeValue;
    this.money = money;
  }
}
