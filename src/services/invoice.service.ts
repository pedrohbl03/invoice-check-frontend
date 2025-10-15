import api from './instance';
import { ChatMessageDTO, InvoiceDTO } from '@/types/services/IInvoice.service';

export const uploadInvoice = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<InvoiceDTO>('/invoices', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const listInvoices = async () => {
  const { data } = await api.get<InvoiceDTO[]>('/invoices');
  return data;
};

export const getInvoiceById = async (id: string) => {
  const { data } = await api.get<InvoiceDTO>(`/invoices/${id}`);
  return data;
};

export const getInvoicesByUserId = async (id: string) => {
  const { data } = await api.get<InvoiceDTO[]>(`/invoices/user/${id}`);
  return data;
}

export const deleteInvoice = async (id: string) => {
  await api.delete(`/invoices/${id}`);
  return { success: true };
};

export const listInvoiceChat = async (id: string) => {
  const { data } = await api.get<ChatMessageDTO[]>(`/invoices/${id}/chat`);
  return data;
};

export const sendInvoiceChatMessage = async (id: string, message: string) => {
  const { data } = await api.post<ChatMessageDTO>(`/invoices/${id}/chat`, { message });
  return data;
};
