import FileUploader from '@/components/FileUploader'
import InvoiceList from '@/components/InvoiceList'
import { getInvoicesByUserId } from '@/services/invoice.service';
import React from 'react'
import { auth } from '../../../auth';

const DashboardPage = async () => {
  const session = await auth();
  const invoices = await getInvoicesByUserId(session?.user.id as string);
  
  return (
    <div>
      <FileUploader />
      <InvoiceList invoices={invoices} />
    </div>
  )
}

export default DashboardPage



