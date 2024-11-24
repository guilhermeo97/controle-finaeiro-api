import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: "O nome é obrigatório" })
  @Length(3, 50, { message: "O nome deve ter entre 3 e 50 caracteres" })
  name: string;

  @IsEmail({}, { message: "E-mail inválido" })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatória" })
  @Length(6, 20, { message: "A senha deve ter entre 6 e 20 caracteres" })
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
