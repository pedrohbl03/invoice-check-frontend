
type InvoiceItem = {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemTotal: number;
}

export type InvoiceStatus = "PENDING" | "ANALYZED" | "ERROR";

export interface IInvoiceDetailsProps {
  id: string;
  userId: string;
  shipperName: string | null;
  consigneeName: string | null;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  invoiceAmount: number | null;
  invoiceDiscount: number | null;
  invoiceTax: number | null;
  invoiceStatus: InvoiceStatus | null;
  invoiceUrl: string | null;
  invoiceItems: InvoiceItem[];
  fileOriginalName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}