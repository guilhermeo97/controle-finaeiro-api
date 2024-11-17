import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Financas from "./finance";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @OneToMany(() => Financas, (task) => task.getUser)
  financas!: Financas[];

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getFinancas() {
    return this.financas;
  }
}
