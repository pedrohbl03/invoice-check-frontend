"use client"

import FileUploader from '@/components/FileUploader'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useEffect } from 'react'

export const UploadSection = () => {
  const {
    file,
    inputUploadRef,
    isUploading,
    progress,
    error,
    uploadedInvoice,
    handleLoadFile,
    handleDrop,
    handleDropOver,
  } = useFileUpload({ maxSizeMB: 15, autoUpload: true })

  useEffect(() => {
    if (uploadedInvoice) {
      console.log('Uploaded invoice:', uploadedInvoice);
    }
  }, [uploadedInvoice]);

  return (
    <div className="space-y-4">
      <FileUploader
        file={file}
        inputUploadRef={inputUploadRef}
        isUploading={isUploading}
        handleLoadFile={handleLoadFile}
        handleDrop={handleDrop}
        handleDropOver={handleDropOver}
        uploadProgress={progress}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {uploadedInvoice && <p className="text-sm text-green-600">Uploaded ID: {uploadedInvoice.id}</p>}
    </div>
  )
}