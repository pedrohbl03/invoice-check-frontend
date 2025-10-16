"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { generateInvoiceSummaryPdf } from "@/services/invoice.service";
import { useRef, useState } from "react";

export interface DownloadSummaryProps {
  invoiceId: string;
}

export const DownloadSummary: React.FC<DownloadSummaryProps> = ({ invoiceId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { showToast } = useToast();

  const handleDownload = async () => {
    setLoading(true);

    const pdfUrl = await generateInvoiceSummaryPdf(invoiceId);

    if (!pdfUrl) {
      showToast("Failed to generate PDF", "error");
      setLoading(false);
      return;
    }

    setPdfUrl(pdfUrl);
    setLoading(false);
    showToast("PDF generated successfully", "success");
    // Trigger download
    setTimeout(() => {
      linkRef.current?.click();
    }, 100);
  }


  return (
    <>
      {pdfUrl && (
        <Button disabled={loading} className="mt-4" asChild>
          <a ref={linkRef} href={pdfUrl} download={`invoice-summary-${invoiceId}.pdf`} className="hidden" target="_blank">Download</a>
        </Button>
      )}

      {!pdfUrl && (
        <Button onClick={handleDownload} disabled={loading} className="mt-4">
          {loading ? 'Generating...' : 'Generate Summary PDF'}
        </Button>
      )}
    </>
  );
};
