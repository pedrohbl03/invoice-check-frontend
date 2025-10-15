export interface IAuthServiceLoginParams {
  email: string;
  password: string;
}

export interface IAuthServiceRegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface IAuthServiceToken {
  token: string;
  expiresexpiresIn: string;
}

export interface IAuthServiceResponse {
  tokens: {
    accessToken: IAuthServiceToken;
    refreshToken: IAuthServiceToken;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface IAuthService {
  login: (credentials: IAuthServiceLoginParams) => Promise<IAuthServiceResponse>;
  logout: () => Promise<IAuthServiceResponse>;
  register: (userData: IAuthServiceRegisterParams) => Promise<IAuthServiceResponse>;
}