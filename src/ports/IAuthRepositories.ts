import { AxiosResponse } from "axios";
import { User } from "../core/models/User";
import { LoginSchema, RegisterSchema } from "../core/models/Auth";

export interface ILoginRepository {
  login: (user_data: LoginSchema) => Promise<AxiosResponse>;
}

export interface IRegisterRepository {
  register: (user_data: RegisterSchema) => Promise<AxiosResponse>;
}

export interface ILogoutRepository {
  logout: () => Promise<void>;
}

export interface ICheckAuthRepository {
  isAuthenticated: () => Promise<boolean>;
}
