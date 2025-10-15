"use client";

import ChatTextArea from "./Textarea";
import { cn } from "@/utils/cn";

import { Separator } from "@/components/ui/separator";
import { InvoiceStatus } from "../InvoiceDetails/types";
import { INVOICE_STATUS } from "@/constants/invoice.constants";
import { useEffect, useRef, useState } from "react";
import { IChatInteractionsDTO } from "@/types/services/IInvoice.service";
import Markdown from "react-markdown";
import { markdownComponents } from "./markdownComponents";

const Chat = ({
  messages,
  invoiceStatus,
  onNewMessage,
  thinking = false
}: {
  messages: IChatInteractionsDTO[];
  invoiceStatus: InvoiceStatus;
  onNewMessage: (message: IChatInteractionsDTO) => Promise<void>;
  thinking: boolean;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (message: string) => {
    if (message.trim() === "") return;

    const newMessage: IChatInteractionsDTO = {
      role: "USER",
      content: message
    };

    setMessage("");
    await onNewMessage(newMessage);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [messages.length, thinking]);

  return (
    <div className="flex flex-col gap-4 h-[calc(100dvh-150px)] p-4 border-1 border-gray-200 rounded-lg overflow-hidden sticky top-10">
      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide flex-1 p-4" ref={chatContainerRef}>

        {invoiceStatus !== INVOICE_STATUS.ANALYZED && (
          <div className="text-center text-sm text-muted-foreground py-4 rounded-lg border-1 border-gray-200 bg-secondary/50">
            Please wait until the invoice is fully processed to start the chat.
          </div>
        )}

        {invoiceStatus === INVOICE_STATUS.ANALYZED && messages.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-4 rounded-lg border-1 border-gray-200 bg-secondary/50">
            Start the conversation by asking a question about your invoice.
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={cn(message.role === "USER" ? "bg-primary text-primary-foreground self-end" : "bg-secondary text-secondary-foreground rounded-lg p-4 self-start", "rounded-lg p-4 max-w-[90%]")}>
            <Markdown components={markdownComponents}>
              {message.content}
            </Markdown>
          </div>

        ))}

        {thinking && (
          <div className="bg-secondary text-secondary-foreground rounded-lg p-4 self-start max-w-[90%] flex items-center gap-2">
            <span className="w-1 h-1 border-1 border-secondary-foreground rounded-full bg-secondary-foreground animate-bounce delay-150" />
            <span className="w-1 h-1 border-1 border-secondary-foreground rounded-full bg-secondary-foreground animate-bounce delay-300" />
            <span className="w-1 h-1 border-1 border-secondary-foreground rounded-full bg-secondary-foreground animate-bounce delay-450" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex flex-col gap-4">
        <Separator />

        <ChatTextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={() => handleSendMessage(message)}
          disabled={invoiceStatus !== INVOICE_STATUS.ANALYZED || thinking}
        />
      </div>
    </div>
  );
};

export default Chat;