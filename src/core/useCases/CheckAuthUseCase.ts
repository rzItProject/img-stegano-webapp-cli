import { ICheckAuthRepository } from '../../ports/IAuthRepositories';

export class CheckAuthUseCase {
  constructor(private checkAuthRepository: ICheckAuthRepository) {}

  async execute(): Promise<boolean> {
    return this.checkAuthRepository.isAuthenticated();
  }
}
