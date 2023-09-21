/* import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CHECK_URL = "http://localhost:8888/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // Votre endpoint qui vérifie si l'utilisateur est authentifié en se basant sur le cookie
      const response = await axios.get(CHECK_URL + "/check-auth", {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        setIsAuthenticated(true);
        console.log("auth success")
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
  }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
 */

// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { LoginUseCase } from "../core/useCases/LoginUseCase";
import AuthAdapter from "../adapters/api/AuthAdapter";
import CheckAuthStatusUseCase from "../core/useCases/CheckAuthUseCase";
import { AxiosResponse } from "axios";
import LogoutUseCase from "../core/useCases/LogOutUseCase";
// import LogoutUseCase from "../core/useCases/LogOutUseCase";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  logout: () => Promise<AxiosResponse<any, any> | undefined>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authAdapter = new AuthAdapter();
  const loginUseCase = new LoginUseCase(authAdapter);
  const logoutUseCase = new LogoutUseCase(authAdapter);
  const checkAuthStatusUseCase = new CheckAuthStatusUseCase(authAdapter);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    try {
      const res = await loginUseCase.execute({ username, password });
      console.log(res.data);
      setIsAuthenticated(true);
      return res;
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      const res = await logoutUseCase.execute();
      console.log(res);
      setIsAuthenticated(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const status = await checkAuthStatusUseCase.execute();
      setIsAuthenticated(status.data.isAuth);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
