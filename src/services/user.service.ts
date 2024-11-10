import User from "../entities/user.entity.";
import { AppDataSource } from "../server";

class UserService {
  private userRepository = AppDataSource.getRepository(User);
  async create(user: User) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }
}

export default new UserService();
