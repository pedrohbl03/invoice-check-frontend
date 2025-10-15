import api from './instance';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '@/types/services/IUser.service';

// Functional style exports
export const createUser = async (payload: CreateUserDTO) => {
  const { data } = await api.post<UserDTO>('/users', payload);
  return data;
};

export const listUsers = async () => {
  const { data } = await api.get<UserDTO[]>('/users');
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await api.get<UserDTO>(`/users/${id}`);
  return data;
};

export const updateUser = async (id: string, payload: UpdateUserDTO) => {
  const { data } = await api.put<UserDTO>(`/users/${id}`, payload);
  return data;
};

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`);
  return { success: true };
};
