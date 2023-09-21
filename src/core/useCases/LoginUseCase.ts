import axios, { AxiosError, AxiosResponse } from "axios";
import { ILoginRepository } from "../../ports/IAuthRepositories";
import { User } from "../models/User";
import { ErrorField, LoginSchema } from "../models/Auth";
import EmailService from './../services/EmailService';

export class LoginUseCase {
  constructor(private loginRepository: ILoginRepository) {}

  /* checkUserFields(user_data: LoginSchema): ErrorField {
    const username: string[] = []
    const email: string[] = [];
    if(this.emailService.)

  } */

  checkUserFields(user_data: LoginSchema){
    return Object.entries(user_data).every(([key, value]) => {
      return value.trim().length > 0;
    });
  }

  async execute(user_data: LoginSchema): Promise<AxiosResponse> {
    try {
      return this.loginRepository.login(user_data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response && axiosError.response.status === 401) {
          throw { code: 401, message: "Permission Refused" };
        } else {
          throw {
            code: axiosError.response?.status || 500,
            message: "LoginFailed",
          };
        }
      } else {
        throw { code: 500, message: "Erreur inconnue lors de la connexion" };
      }
    }
  }
}
