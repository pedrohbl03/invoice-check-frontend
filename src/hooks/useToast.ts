import { toast } from 'react-toastify';

export const useToast = () => {

  const showToast = (message: string, type: "success" | "error") => {
    return toast(message, { type });
  };

  return { showToast };
};
