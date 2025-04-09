// src/utils/jwtHelper.ts

import * as jwtDecode from "jwt-decode"; // ✅ Use wildcard import for compatibility

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
  // add more fields if your token contains them
}

export const getToken = (token: string): DecodedToken => {
  return jwtDecode.default(token) as DecodedToken; // ✅ Call .default on module
};
