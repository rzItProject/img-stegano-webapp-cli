import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ILoginRepository,
  ILogoutRepository,
  IRegisterRepository,
  ICheckAuthRepository,
} from "../../ports/IAuthRepositories";
import { User } from "../../core/models/User";
import { LoginSchema, RegisterSchema } from "../../core/models/Auth";

const LOGIN_URL = "http://localhost:8888/auth/login";
const LOGOUT_URL = "http://localhost:8888/auth/logout";
const REGISTER_URL = "http://localhost:8888/auth/register";
const CHECKAUTH_URL = "http://localhost:8888/auth/check-auth";

class AuthAdapter
  implements
    ILoginRepository,
    ILogoutRepository,
    IRegisterRepository,
    ICheckAuthRepository
{
  async login(user_data: LoginSchema): Promise<AxiosResponse> {
    const response: AxiosResponse = await axios.post(
      LOGIN_URL,
      JSON.stringify({
        username: user_data.username,
        password: user_data.password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  }

  async register(user_data: RegisterSchema): Promise<AxiosResponse> {
    const response = await axios.post(
      REGISTER_URL,
      JSON.stringify({
        name: user_data.name,
        username: user_data.username,
        email: user_data.email,
        password: user_data.password,
        birth: user_data.birth,
        gender: user_data.gender,
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response;
  }

  async logout(): Promise<void> {
    await axios.post(LOGOUT_URL);
  }

  async isAuthenticated(): Promise<boolean> {
    const response = await axios.get(CHECKAUTH_URL);
    return response.data.isAuthenticated;
  }
}

export default AuthAdapter;
