type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
}

type BusinessInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface IInvoiceDetailsProps {
  id: number;
  fileName: string;
  items: InvoiceItem[];
  uploadedAt: string;
  totalAmount: number;
  status: string;
  from: BusinessInfo;
  to: BusinessInfo;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceDueDate: string;
  imageUrl: string;
}