"use client";

import { useCallback, useRef, useState } from "react";
import { uploadInvoice } from "@/services/invoice.service";
import { InvoiceDTO } from "@/types/services/IInvoice.service";
import { useRouter } from "next/navigation";

interface UseFileUploadOptions {
  maxSizeMB?: number;
  allowedTypes?: string[]; 
  autoUpload?: boolean; 
}

interface UseFileUploadReturn {
  file: File | undefined;
  isUploading: boolean;
  progress: number;
  error: string | null;
  uploadedInvoice: InvoiceDTO | null;
  inputUploadRef: React.RefObject<HTMLInputElement | null>;
  selectFile: (file: File) => void;
  handleLoadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropOver: (e: React.DragEvent<HTMLDivElement>) => void;
  startUpload: () => Promise<void>;
  reset: () => void;
  cancel: () => void;
}

export const useFileUpload = (options: UseFileUploadOptions = {}): UseFileUploadReturn => {
  const { maxSizeMB = 10, allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/webp"], autoUpload = false } = options;

  const [file, setFile] = useState<File | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedInvoice, setUploadedInvoice] = useState<InvoiceDTO | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputUploadRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const validateFile = (f: File): string | null => {
    if (!allowedTypes.includes(f.type)) return "Unsupported file type";
    const sizeMB = f.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) return `File exceeds ${maxSizeMB}MB limit`;
    return null;
  };

  const doUploadFile = useCallback(async (target: File) => {
    setError(null);
    setIsUploading(true);
    setProgress(0);
    abortRef.current = new AbortController();
    try {
      const invoice = await uploadInvoice(target, {
        onProgress: (p) => setProgress(p),
        signal: abortRef.current.signal,
      });
      setUploadedInvoice(invoice);

      router.push(`/${invoice.id}`);
      
      setProgress(100);
    } catch (e) {
      const err = e as { name?: string; message?: string };
      if (err?.name === 'CanceledError' || err?.message === 'canceled') {
        setError('Upload canceled');
      } else {
        setError(err?.message || 'Upload failed');
      }
    } finally {
      setIsUploading(false);
    }
  }, []);

  const selectFile = (f: File) => {
    const validation = validateFile(f);
    if (validation) {
      setError(validation);
      return;
    }
    setFile(f);
    setUploadedInvoice(null);
    setProgress(0);
    if (autoUpload) void doUploadFile(f);
  };

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const f = e.target.files?.[0];
    if (f) selectFile(f);
    // allow selecting the same file again
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];

    console.log(f);

    if (f) selectFile(f);
  };

  const handleDropOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const startUpload = async () => {
    if (!file) return;
    if (uploadedInvoice) return; // already uploaded
    if (file) await doUploadFile(file);
  };

  const reset = () => {
    abortRef.current?.abort();
    setFile(undefined);
    setProgress(0);
    setError(null);
    setUploadedInvoice(null);
    setIsUploading(false);
  };

  const cancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  };

  return {
    file,
    isUploading,
    progress,
    error,
    uploadedInvoice,
    inputUploadRef,
    selectFile,
    handleLoadFile,
    handleDrop,
    handleDropOver,
    startUpload,
    reset,
    cancel,
  };
};