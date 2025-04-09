import { useState, useEffect, ReactNode } from "react";
import { AuthContext, AuthState } from "./AuthContext";
import { getTokenFromJWT } from "@/utils/jwtHelper";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthState | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = getTokenFromJWT(token);
      setAuth(user);
    }
  }, []);

  const login = (token: string) => {
    const user = getTokenFromJWT(token);
    setAuth(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
