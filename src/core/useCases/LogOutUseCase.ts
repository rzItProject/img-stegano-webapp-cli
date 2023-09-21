import { ILogoutRepository } from '../../ports/IAuthRepositories';

export class LogoutUseCase {
  constructor(private logoutRepository: ILogoutRepository) {}

  async execute(): Promise<void> {
    return this.logoutRepository.logout();
  }
}
