import jwt_decode from "jwt-decode";

export interface AuthState {
  id: number;
  email: string;
  role: string;
  token: string;
}

export const getTokenFromJWT = (token: string): AuthState => {
  const decoded = jwt_decode<{ id: number; email: string; role: string }>(
    token
  );
  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    token: token,
  };
};
