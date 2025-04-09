// src/context/AuthContext.ts
import { createContext } from "react";

export interface AuthState {
  id: number;
  email: string;
  role: string;
  token: string;
}

export interface AuthContextType {
  auth: AuthState | null;
  setAuth: (auth: AuthState | null) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
