import jwtDecode from "jwt-decode";
import { FirebaseToken } from "src/@types/auth.type";

export const isTokenExpired = (token: string | undefined): boolean => {
  if (!token) return true;
  const decoded = jwtDecode<FirebaseToken>(token);

  if (decoded.exp < Date.now() / 1000) {
    return true;
  }
  return false;
};
