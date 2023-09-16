import { AxiosResponse } from 'axios';
import { IRegisterRepository } from '../../ports/IAuthRepositories';
import { RegisterSchema } from '../models/Auth';

export class RegisterUseCase {
  constructor(private registerRepository: IRegisterRepository) {}

  async execute(user_data: RegisterSchema): Promise<AxiosResponse> {
    return this.registerRepository.register(user_data);
  }
}
