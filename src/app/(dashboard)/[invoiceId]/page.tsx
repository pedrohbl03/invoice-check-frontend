import { InvoiceDetailsSection } from '@/components/InvoiceDetailsSection';
import { getChatByInvoiceId, getInvoiceById } from '@/services/invoice.service';
import { notFound } from 'next/navigation';
import React from 'react';

const NewInvoicePage = async (props: PageProps<'/[invoiceId]'>) => {
  const { invoiceId } = await props.params;

  const invoiceDetails = await getInvoiceById(invoiceId);
  const messages = await getChatByInvoiceId(invoiceId);

  if (!invoiceDetails.id) {
    return notFound();
  }

  return (
    <InvoiceDetailsSection
      invoiceDetails={invoiceDetails}
      chatHistory={messages}
    />
  )
}

export default NewInvoicePage