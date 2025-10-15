import { InvoiceStatus } from "@/components/InvoiceDetails/types";

export interface InvoiceDTO {
  id: string;
  userId: string;
  shipperName: string | null;
  consigneeName: string | null;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  invoiceAmount: number | null;
  invoiceDiscount: number | null;
  invoiceTax: number | null;
  invoiceStatus: InvoiceStatus;
  invoiceUrl: string | null;
  fileOriginalName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  invoiceItems: InvoiceItemDTO[];
}
export interface InvoiceItemDTO {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemTotal: number;
}

export interface IChatInteractionsDTO {
  id?: string;
  chatId?: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt?: string;
}

export interface IChatHistoryDTO {
  id?: string;
  invoiceId?: string;
  chatInteractions: IChatInteractionsDTO[];
  createdAt?: string;
}
