import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Task from "./task";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  private id!: number;

  @Column({ type: "varchar" })
  private name: string;

  @Column({ type: "varchar" })
  private email: string;

  @Column({ type: "varchar" })
  private password: string;

  @OneToMany(() => Task, (task) => task.getUser)
  private tasks!: Task[];

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

  getTasks() {
    return this.tasks;
  }
}
