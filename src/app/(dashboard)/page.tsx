import InvoiceList from '@/components/InvoiceList'
import { getInvoicesByUserId } from '@/services/invoice.service';
import React from 'react'
import { auth } from '../../../auth';
import { UploadSection } from '@/components/UploadSection';
import { Separator } from '@/components/ui/separator';
import { IInvoiceDetailsProps } from '@/components/InvoiceDetails/types';
import { IInvoiceCardProps } from '@/components/InvoiceCard';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const invoices = await getInvoicesByUserId(session?.user.id) as IInvoiceDetailsProps[];

  return (
    <div>
      <UploadSection />
      <div>
        <Separator className='my-6' />
      </div>
      <InvoiceList invoices={invoices as IInvoiceCardProps[]} />
    </div>
  )
}

export default DashboardPage



