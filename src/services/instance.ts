import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { auth } from '../../auth';
export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach bearer token if available
instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {

  const authSession = await auth();
  const token = authSession?.user.accessToken;

    if (token) {
      config.headers = config.headers || {};
      // AxiosRequestHeaders is an index signature so this is safe
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

  return config;
});

// Normalize errors to a consistent shape while still rejecting so callers can decide
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Try to extract a conventional message field
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