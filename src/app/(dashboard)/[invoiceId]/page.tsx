"use client";

import Chat from '@/components/Chat';
import { Message } from '@/components/Chat/types';
import FileUploader from '@/components/FileUploader';
import InvoiceDetails from '@/components/InvoiceDetails';
import { notFound, useParams } from 'next/navigation';
import React from 'react';

const messages: Message[] = [
  {
    id: "1",
    content: "Hello, how are you?",
    role: "user",
  },
  {
    id: "2",
    content: "I'm good, thank you!",
    role: "assistant",
  },
  {
    id: "3",
    content: "What is the weather in Tokyo? And how to calculate the total amount?",
    role: "user",
  },
  {
    id: "4",
    content: "It's sunny in Tokyo. And the total amount is 100000!",
    role: "assistant",
  },
  {
    id: "5",
    content: "What is the weather in Tokyo?",
    role: "user",
  },
  {
    id: "6",
    content: "It's sunny in Tokyo!",
    role: "assistant",
  },
  {
    id: "7",
    content: "What is the weather in Tokyo?",
    role: "user",
  },
  {
    id: "8",
    content: "It's sunny in Tokyo!",
    role: "assistant",
  },
  {
    id: "9",
    content: "What is the weather in Tokyo?",
    role: "user",
  },
  {
    id: "10",
    content: "It's sunny in Tokyo!",
    role: "assistant",
  },
];

const invoiceDetailsData = {
  id: 1,
  fileName: "Invoice 1.pdf",
  items: [
    {
      name: "Item 1",
      quantity: 1,
      price: 100000,
    },
  ],
  uploadedAt: "2025-01-01",
  totalAmount: 100000,
  status: "Paid",
  from: {
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    phone: "1234567890",
    email: "john.doe@example.com",
  },
  to: {
    to: "Jane Doe",
    invoiceNumber: "1234567890",
    invoiceDate: "2025-01-01",
    invoiceDueDate: "2025-01-01",
    imageUrl: "/teste-invoice.png",
  },
  invoiceNumber: "1234567890",
  invoiceDate: "2025-01-01",
  invoiceDueDate: "2025-01-01",
  imageUrl: "/teste-invoice.png",
}

const NewInvoicePage = () => {

  const params = useParams();
  const invoiceId = Number(params.invoiceId);

  console.log(invoiceId);

  if (!invoiceId) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-7">
        {/* TODO: Show the invoice details */}
        <InvoiceDetails {...invoiceDetailsData} />
      </div>
      <div className="col-span-5">
        <Chat messages={messages} />
      </div>
    </div>
  )
}

export default NewInvoicePage