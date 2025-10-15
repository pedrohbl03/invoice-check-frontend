"use client";

import { UploadIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Progress } from "../ui/progress";
import * as React from "react";

export interface IFileUploaderProps {
  file: File | undefined;
  inputUploadRef: React.RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  handleLoadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropOver: (e: React.DragEvent<HTMLDivElement>) => void;
  uploadProgress: number;
}

const FileUploader = ({
  file,
  inputUploadRef,
  isUploading,
  handleLoadFile,
  handleDrop,
  handleDropOver,
  uploadProgress
}: IFileUploaderProps) => {

  const handleClick = () => {
    if (!isUploading) {
      inputUploadRef?.current?.click()
    }
  }

  return (
    <div
      className="flex flex-col gap-2 border border-dashed border-gray-200 rounded-lg p-10 cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDropOver}
      onClick={handleClick}
      draggable={true}
      aria-disabled={isUploading}
    >

      <input type="file" onChange={(e) => handleLoadFile(e)} className="hidden" ref={inputUploadRef} accept=".pdf,.png,.jpg,.jpeg,.webp" disabled={isUploading} />

      {!isUploading && !file && (
        <div className="flex flex-col gap-2 items-center justify-center">
          <UploadIcon className="w-10 h-10 text-gray-500" />
          <p className="text-sm text-gray-500">Drag and drop your file here or click to upload</p>
          <p className="text-sm text-gray-500">Supported formats: PDF, PNG, JPG, JPEG and WEBP</p>
        </div>
      )}

      {isUploading && (
        <div className="flex flex-col gap-4 w-full items-center py-4">
          <Spinner className="text-gray-500 w-10 h-10" />
          <Progress value={uploadProgress} />
          <div>
            <p className="text-sm text-gray-500">{uploadProgress}% uploaded</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-md text-gray-500">We are uploading your file & preparing it for processing...</p>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;