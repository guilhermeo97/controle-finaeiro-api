import { StatusTask } from "./enums/StatusTaskEnum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";

@Entity("tasks")
export default class Task {
  @PrimaryGeneratedColumn()
  private id!: number;
  @Column({ type: "varchar" })
  private title: string;
  @Column({ type: "varchar" })
  private description: string;
  @Column({ type: "timestamp" })
  private startDate: Date;
  @Column({ type: "timestamp" })
  private finishDate: Date;
  @Column({ type: "enum", enum: StatusTask, default: StatusTask.N_INICIADO })
  private status: StatusTask;

  @ManyToOne(() => User, (user) => user.getTasks)
  private user!: User;

  constructor(
    title: string,
    description: string,
    startDate: Date,
    finishDate: Date,
    status: StatusTask
  ) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getStartDate() {
    return this.startDate;
  }

  getfinishDate() {
    return this.finishDate;
  }

  getStatus() {
    return this.status;
  }

  getUser() {
    return this.user;
  }
}
