import UserRepository from "../repositories/user.repository";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
}
