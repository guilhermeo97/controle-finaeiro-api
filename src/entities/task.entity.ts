import { StatusTask } from "./enums/StatusTaskEnum";
import { Entity } from "typeorm";

@Entity("tasks")
export default class Task {
  private title: string;
  private description: string;
  private startDate: Date;
  private endDate: Date;
  private status: StatusTask;

  constructor(
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    status: StatusTask
  ) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
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

  getEndDate() {
    return this.endDate;
  }

  getStatus() {
    return this.status;
  }
}
