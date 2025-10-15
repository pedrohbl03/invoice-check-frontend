"use client"

import Chat from "../Chat";
import InvoiceDetails from "../InvoiceDetails";
import { useState } from "react"
import { usePolling } from "@/hooks/usePolling"
import { getInvoiceById, sendInvoiceChatMessage } from "@/services/invoice.service"
import { INVOICE_STATUS } from "@/constants/invoice.constants";
import { IChatHistoryDTO, IChatInteractionsDTO, InvoiceDTO } from "@/types/services/IInvoice.service";

export interface IInvoiceDetailsSectionProps {
  invoiceDetails: InvoiceDTO;
  chatHistory: IChatHistoryDTO;
}

export const InvoiceDetailsSection = ({ invoiceDetails, chatHistory }: IInvoiceDetailsSectionProps) => {
  const [invoiceDetailsLocalState, setInvoiceDetailsLocalState] = useState<InvoiceDTO>(invoiceDetails);
  const [chatHistoryLocalState, setChatHistoryLocalState] = useState<IChatInteractionsDTO[]>(chatHistory.chatInteractions);
  const [thinking, setThinking] = useState(false);

  usePolling(async () => {
    if (invoiceDetailsLocalState.invoiceStatus !== INVOICE_STATUS.ANALYZED) {
      const data = await getInvoiceById(invoiceDetailsLocalState.id);
      setInvoiceDetailsLocalState(data);
    }
  }, 5000, [invoiceDetailsLocalState]);



  const handleNewMessage = async (message: IChatInteractionsDTO) => {
    setChatHistoryLocalState((prev) => [...prev, message]);

    setThinking(true);
    const chatResponse = await sendInvoiceChatMessage(invoiceDetailsLocalState.id, message.content);

    if (!chatResponse) return;

    setChatHistoryLocalState((prev) => [
      ...prev,
      chatResponse,
    ]);
    setThinking(false);
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-7">
        <InvoiceDetails {...invoiceDetailsLocalState} />
      </div>
      <div className="col-span-5">
        <Chat messages={chatHistoryLocalState} invoiceStatus={invoiceDetailsLocalState.invoiceStatus} onNewMessage={handleNewMessage} thinking={thinking} />
      </div>
    </div>

  );
};
