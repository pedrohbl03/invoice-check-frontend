export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

export type ChatTextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
