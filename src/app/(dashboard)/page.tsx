import FileUploader from '@/components/FileUploader'
import InvoiceList from '@/components/InvoiceList'
import React from 'react'

const invoices = [
  {
    id: 1,
    name: "Invoice 1",
  },
  {
    id: 2,
    name: "Invoice 2",
  },
  {
    id: 3,
    name: "Invoice 3",
  },
  {
    id: 4,
    name: "Invoice 4",
  },
  {
    id: 5,
    name: "Invoice 5",
  },
  {
    id: 6,
    name: "Invoice 6",
  },
];

const DashboardPage = () => {
  return (
    <div>
      <FileUploader />
      <InvoiceList invoices={invoices} />
    </div>
  )
}

export default DashboardPage



