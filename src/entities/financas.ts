import { TypeValue } from "./enums/TypeValue";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";

@Entity("financas")
export default class Financas {
  @PrimaryGeneratedColumn()
  private id!: number;
  @Column({ type: "varchar" })
  private description: string;
  @Column({ type: "date" })
  private ocurence_date: Date;
  @Column({ type: "enum", enum: TypeValue })
  private typeValue: TypeValue;

  @ManyToOne(() => User, (user) => user.getFinancas)
  private user!: User;

  constructor(description: string, ocurence_date: Date, typeValue: TypeValue) {
    this.description = description;
    this.ocurence_date = ocurence_date;
    this.typeValue = typeValue;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getocurence_date() {
    return this.ocurence_date;
  }

  gettypeValue() {
    return this.typeValue;
  }

  getUser() {
    return this.user;
  }
}
