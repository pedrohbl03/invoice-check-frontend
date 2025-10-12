import { Separator } from "@/components/ui/separator";
import { ChatTextAreaProps } from "../types";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea, InputGroupText } from "@/components/ui/input-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ArrowUpIcon, PlusIcon } from "lucide-react";

const ChatTextArea = ({
  value,
  onChange,
  onSubmit,
}: ChatTextAreaProps) => {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Ask, Search or Chat..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="default"
          className="rounded-full cursor-pointer ml-auto"
          size="icon-xs"
        >
          <ArrowUpIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default ChatTextArea;