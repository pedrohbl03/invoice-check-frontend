import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { auth } from '../../auth';
import { getSession } from 'next-auth/react';
export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});


const isServer = typeof window === "undefined"

const logInterceptor = async (req: InternalAxiosRequestConfig) => {
  if (isServer) {
    console.log("[AXIOS] [SERVER] ", req.url)
  } 
  else {
    console.log("[AXIOS] [CLIENT] ", req.url)
  }
  return req
}


instance.interceptors.request.use(logInterceptor, (error) => Promise.reject(error));
instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (isServer) {
    const session = await auth()
    const token = session?.user.accessToken;

    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    return config;
  } else {
    const session = await getSession();
    const token = session?.user.accessToken;
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    return config;
  }
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const maybeData = error.response?.data as unknown;
    let extractedMessage = error.message;
    if (maybeData && typeof maybeData === 'object' && 'message' in (maybeData as Record<string, unknown>)) {
      const val = (maybeData as Record<string, unknown>).message;
      if (typeof val === 'string') extractedMessage = val;
    }
    const apiError: ApiError = {
      status: error.response?.status,
      message: extractedMessage || 'Erro inesperado',
      data: maybeData,
    };
    return Promise.reject(apiError);
  }
);

export default instance;