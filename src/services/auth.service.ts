import { IAuthService, IAuthServiceLoginParams, IAuthServiceRegisterParams } from "@/types/services/IAuth.service";
import instance from "./instance";

const login = async (credentials: IAuthServiceLoginParams) => {
  const response = await instance.post("/auth/login", credentials);
  return response.data;
};

const logout = async () => {
  const response = await instance.post("/auth/logout");
  return response.data;
};

const register = async (userData: IAuthServiceRegisterParams) => {
  const response = await instance.post("/auth/register", userData);
  return response.data;
};

const authService: IAuthService = {
  login,
  logout,
  register,
};

export default authService;
