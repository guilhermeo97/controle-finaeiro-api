import { IsNumber, IsOptional } from "class-validator";
import { TypeValue } from "../entities/enums/TypeValue";

export default class ModifyinanceDTO {
  @IsOptional()
  description: string;
  @IsOptional()
  ocurenceDate: Date;
  @IsOptional()
  typeValue: TypeValue;
  @IsNumber()
  @IsOptional()
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
