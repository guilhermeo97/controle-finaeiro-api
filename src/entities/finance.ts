import { TypeValue } from "./enums/TypeValue";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";

@Entity("financas")
export default class Finance {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar" })
  description: string;
  @Column({ type: "date" })
  ocurenceDate: Date;
  @Column({ type: "enum", enum: TypeValue })
  typeValue: TypeValue;
  @Column({ type: "decimal" })
  money: number;
  @ManyToOne(() => User, (user) => user.getFinancas)
  user!: User;

  constructor(
    description: string,
    ocurence_date: Date,
    typeValue: TypeValue,
    money: number,
    user: User
  ) {
    this.description = description;
    this.ocurenceDate = ocurence_date;
    this.typeValue = typeValue;
    this.money = money;
    this.user = user;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getocurence_date() {
    return this.ocurenceDate;
  }

  gettypeValue() {
    return this.typeValue;
  }

  getUser() {
    return this.user;
  }
}
