// src/context/AuthContext.tsx
import { AuthContext } from "./AuthContextDefinition";
import { useState, useEffect, ReactNode } from "react";
import { getToken } from "../utils/jwtHelper";
import { AuthState } from "./AuthContextDefinition";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState | null>(null); // ✅ Correct typing

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(getToken(token));
    }
  }, []);

  const login = (token: string) => {
    const user = getToken(token);
    setAuth(user);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
