import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../entities/user";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import { generateToken } from "../middleware/auth/auth";
import { CreateUserDTO } from "../dto/createuserdto";
import { DisplayUserDTO } from "../dto/displayuserdto";

dotenv.config();

class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private saultRounds = 10;

  async bcryptHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saultRounds);
    return hashedPassword;
  }

  async create(dto: CreateUserDTO) {
    const existUser = await this.findUserByEmail(dto.email);
    if (existUser) {
      return null;
    }

    const hashedPassword = await this.bcryptHash(dto.password);
    if (!hashedPassword) {
      return null;
    }
    const newUser = new User(dto.name, dto.email, hashedPassword);
    const createUser = await this.userRepository.save(newUser);

    if (!createUser) {
      return null;
    }
    const displayUserDto = new DisplayUserDTO(
      createUser.name,
      createUser.email
    );
    return displayUserDto;
  }

  async findAll(email: string) {
    const findUser = await this.findUserByEmail(email);

    if (!findUser) {
      return null;
    }
    const findUsers = await this.userRepository.find();
    const users = {
      users: findUsers.map((user) => {
        return new DisplayUserDTO(user.name, user.email);
      }),
    };
    if (findUsers.length === 0) {
      return null;
    }
    return users;
  }

  async login(email: string, password: string) {
    const findUser = await this.findUserByEmail(email);
    if (!findUser) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = generateToken({ email: findUser.email });
    if (!token) {
      return null;
    }

    return { token };
  }

  async findUserByEmail(email: string) {
    const findUser = this.userRepository.findOne({ where: { email } });
    if (!findUser) {
      return null;
    }
    return findUser;
  }
}

export default new UserService();
