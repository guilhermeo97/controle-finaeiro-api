import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../entities/user";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";
import { generateToken } from "../auth/auth";

dotenv.config();
const saultRounds = 10;

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async bcryptHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, saultRounds);
    return hashedPassword;
  }

  async create(name: string, email: string, password: string) {
    const hashedPassword = await this.bcryptHash(password);
    if (!hashedPassword) {
      return Error("Não foi possível encriptar a senha");
    }
    const newUser = new User(name, email, hashedPassword);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("E-mail e senha são obrigatório");
    }
    const findUser = await this.findOne(email);
    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = generateToken({ email: findUser.email });
    return { data: { findUser, token } };
  }

  async findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}

export default new UserService();
