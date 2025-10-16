import api from './instance';
import { IChatHistoryDTO, IChatInteractionsDTO, InvoiceDTO } from '@/types/services/IInvoice.service';
import { AxiosRequestConfig } from 'axios';

export const uploadInvoice = async (file: File, options?: { onProgress?: (pct: number) => void; signal?: AbortSignal; }) => {
  const formData = new FormData();
  formData.append('file', file);
  const config: AxiosRequestConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal: options?.signal,
    onUploadProgress: (evt) => {
      if (evt.total && options?.onProgress) {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        options.onProgress(pct);
      }
    }
  };
  const { data } = await api.post<InvoiceDTO>('/invoices', formData, config);
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

export const getChatByInvoiceId = async (id: string) => {
  const { data } = await api.get<IChatHistoryDTO>(`/invoices/${id}/chat`);
  return data;
}

export const sendInvoiceChatMessage = async (id: string, message: string) => {
  const { data } = await api.post<IChatInteractionsDTO>(`/invoices/${id}/chat`, { message });
  return data;
};

export const generateInvoiceSummaryPdf = async (id: string) => {
  const { data } = await api.get<{ url: string }>(`/invoices/${id}/pdf`);
  return data.url;
};