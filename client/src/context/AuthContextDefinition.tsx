// src/context/AuthContextDefinition.ts

import { createContext } from "react";

export interface AuthState {
  userId: number;
  email: string;
  role: string;
  token: string;
}
interface AuthContextType {
  auth: AuthState | null;
  setAuth: (auth: AuthState | null) => void;
  login: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
