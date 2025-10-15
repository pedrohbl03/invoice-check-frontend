
type InvoiceItem = {
  itemName: string;
  itemQuantity: number;
  itemPrice: ScientificNumber;
  itemTotal: ScientificNumber;
}

export type ScientificNumber = number | { s: number; e: number; d: number[] };

export type InvoiceStatus = "PENDING" | "ANALYZED" | "ERROR";

export interface IInvoiceDetailsProps {
  id: string;
  userId: string;
  shipperName: string | null;
  consigneeName: string | null;
  invoiceNumber: string | null;
  invoiceDate: string | null;
  invoiceAmount: ScientificNumber | null;
  invoiceDiscount: number | null;
  invoiceTax: ScientificNumber | null;
  invoiceStatus: InvoiceStatus | null;
  invoiceUrl: string | null;
  invoiceItems: InvoiceItem[];
  fileOriginalName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}