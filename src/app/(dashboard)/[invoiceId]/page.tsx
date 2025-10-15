import Chat from '@/components/Chat';
import { Message } from '@/components/Chat/types';
import InvoiceDetails from '@/components/InvoiceDetails';
import { getInvoiceById } from '@/services/invoice.service';
import { notFound } from 'next/navigation';
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

const NewInvoicePage = async (props: PageProps<'/[invoiceId]'>) => {

  const { invoiceId } = await props.params;

  const invoiceDetails = await getInvoiceById(invoiceId);

  if (!invoiceDetails.id) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-7">
        <InvoiceDetails {...invoiceDetails} />
      </div>
      <div className="col-span-5">
        <Chat messages={messages} />
      </div>
    </div>
  )
}

export default NewInvoicePage