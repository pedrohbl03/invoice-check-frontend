import { ChatTextAreaProps } from "../types";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { ArrowUpIcon } from "lucide-react";

const ChatTextArea = ({
  value,
  onChange,
  onSubmit,
  disabled
}: ChatTextAreaProps) => {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Ask, Search or Chat..." onChange={onChange} value={value} disabled={disabled} />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="default"
          className="rounded-full cursor-pointer ml-auto"
          size="icon-xs"
          disabled={disabled}
          onClick={onSubmit}
        >
          <ArrowUpIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default ChatTextArea;