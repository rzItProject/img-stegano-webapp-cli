import axios, { AxiosError, AxiosResponse } from 'axios';
import { ICheckAuthRepository } from '../../ports/IAuthRepositories';

class CheckAuthStatusUseCase {
  constructor(private checkAuthRepository: ICheckAuthRepository) {}

  async execute(): Promise<AxiosResponse> {
    try{
      const response = await this.checkAuthRepository.checkAuthStatus();
      return response;
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

export default CheckAuthStatusUseCase;