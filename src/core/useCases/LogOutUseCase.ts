import axios, { AxiosError, AxiosResponse } from 'axios';
import { ILogoutRepository } from '../../ports/IAuthRepositories';

class LogoutUseCase {
  constructor(private logoutRepository: ILogoutRepository) {}

  async execute(): Promise<AxiosResponse> {
    try{
      return this.logoutRepository.logout();
    }catch (error) {
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

export default LogoutUseCase
