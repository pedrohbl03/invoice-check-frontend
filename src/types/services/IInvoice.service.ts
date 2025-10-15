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
  invoiceStatus: string | null;
  invoiceUrl: string | null;
  fileOriginalName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ChatMessageDTO {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  message: string;
  createdAt?: string;
}
