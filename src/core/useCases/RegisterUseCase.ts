import axios, { AxiosResponse } from "axios";
import { IRegisterRepository } from "../../ports/IAuthRepositories";
import { RegisterSchema } from "../models/Auth";
import PasswordService from "./../services/PasswordService";

export class RegisterUseCase {
  constructor(
    private registerRepository: IRegisterRepository,
    private passwordService: PasswordService
  ) {}

  validatePassword(password: string): string[] {
    let errors: string[] = [];
    if (this.passwordService.isEmpty(password)) {
      errors.push("Le mot de passe est requis");
    } else {
      if (!this.passwordService.isLongEnough(password))
        errors.push("Au moins 8 caractères");

      if (!this.passwordService.hasLowercase(password))
        errors.push("Au moins une lettre minuscule");

      if (!this.passwordService.hasUppercase(password))
        errors.push("Au moins une lettre majuscule.");

      if (!this.passwordService.hasNumber(password))
        errors.push("Au moins un chiffre");

      if (!this.passwordService.hasRequiredSpecialChar(password))
        errors.push("Au moins un caractère spécial : !@#$%^&*?_-");
    }

    return errors;
  }

  async execute(user_data: RegisterSchema): Promise<AxiosResponse> {
    try {
      return await this.registerRepository.register(user_data);
  } catch (error:any) {
    if (axios.isAxiosError(error)) {  // Vérifiez si c'est une erreur Axios
      console.error(`Status Code: ${error.response?.status}`);
      console.error(`Data: ${JSON.stringify(error.response?.data)}`);
    } else {
      console.error(`An unknown error occurred: ${error}`);
    }
    throw new Error();
  }
  }
}
