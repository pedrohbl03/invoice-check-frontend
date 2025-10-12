"use client";

import { Message } from "./types";
import ChatTextArea from "./Textarea";
import { cn } from "@/utils/cn";

import { Separator } from "@/components/ui/separator";

const Chat = ({
  messages,
}: {
  messages: Message[];
}) => {
  
  return (
    <div className="flex flex-col gap-4 h-[calc(100dvh-150px)] p-4 border-1 border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide flex-1 p-4">
        {messages.map((message) => (
          <div key={message.id} className={cn(message.role === "user" ? "bg-primary text-primary-foreground self-end" : "bg-secondary text-secondary-foreground rounded-lg p-4 self-start", "rounded-lg p-4 max-w-[90%]")}>
            {message.content}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Separator />

        <ChatTextArea
          value={""}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      </div>
    </div>
  );
};

export default Chat;