import { AuthState } from "../context/AuthContextDefinition";
import jwt_decode from "jwt-decode";

export function getToken(token: string): AuthState {
  const decoded = jwt_decode<Partial<AuthState>>(token);
  return {
    userId: decoded.userId!,
    email: decoded.email!,
    role: decoded.role!,
    token: token, // store the raw token string
  };
}
