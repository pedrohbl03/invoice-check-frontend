import { useRef, useState } from "react";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const inputUploadRef = useRef<HTMLInputElement>(null);

  const loadFile = (file: File | undefined) => {
    if (file) {
      setFile(file);
      setIsUploading(true);
    }
  }

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    loadFile(e.target.files?.[0]);
  }
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    loadFile(e.dataTransfer.files?.[0]);
  }

  const handleDropOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }
  
  return {
    file,
    inputUploadRef,
    isUploading,
    handleLoadFile,
    handleDrop,
    handleDropOver,
  }
}