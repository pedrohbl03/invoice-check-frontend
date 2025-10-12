"use client";

import { useState, useRef } from "react";
import { Upload, UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Progress } from "../ui/progress";

const FileUploader = () => {
  const { file, isUploading, handleLoadFile, handleDrop, handleDropOver, inputUploadRef } = useFileUpload();

  return (
    <div
      className="flex flex-col gap-2 border border-dashed border-gray-200 rounded-lg p-10 cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDropOver}
      onClick={() => inputUploadRef.current?.click()}
    >

      <input type="file" onChange={(e) => handleLoadFile(e)} className="hidden" ref={inputUploadRef}/>

      {file && (
        <p className="text-sm text-gray-500">{file.name}</p>
      )}

      {!isUploading && !file && (
        <div className="flex flex-col gap-2 items-center justify-center">
          <UploadIcon className="w-10 h-10 text-gray-500" />
          <p className="text-sm text-gray-500">Drag and drop your file here or click to upload</p>
          <p className="text-sm text-gray-500">Supported formats: PDF, PNG, JPG</p>
        </div>
      )}

      {isUploading && (
        <div className="flex flex-col gap-2">
          <Spinner />
          <Progress value={50} />
        </div>
      )}

    </div>
  );
};

export default FileUploader;