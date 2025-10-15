export interface IAuthServiceLoginParams {
  email: string;
  password: string;
}

export interface IAuthServiceRegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface IAuthServiceResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IAuthService {
  login: (credentials: IAuthServiceLoginParams) => Promise<IAuthServiceResponse>;
  logout: () => Promise<IAuthServiceResponse>;
  register: (userData: IAuthServiceRegisterParams) => Promise<IAuthServiceResponse>;
}