import { Calendar, FileArchive, FileDigit, ShoppingBag, User } from "lucide-react"
import { Badge } from "../ui/badge"
import { IInvoiceDetailsProps } from "./types"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { cn } from "@/utils/cn"
import { formatCurrency, formatDate } from "@/utils/format"
import { Button } from "../ui/button"

const InvoiceDetailsLabel = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => {
  return (
    <div className="flex gap-2 items-start">
      <div className="flex w-5 h-5">
        {icon}
      </div>

      <div>
        <h3 className="text-md text-muted-foreground font-medium">{label}</h3>
        <p className="">{value}</p>
      </div>
    </div>
  )
}

const InvoiceDetails = ({
  id,
  fileName,
  items,
  uploadedAt,
  totalAmount,
  status,
  from,
  to,
  invoiceNumber,
  invoiceDate,
  invoiceDueDate,
  imageUrl = "/teste-invoice.png",
}: IInvoiceDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {imageUrl && (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border-1 border-gray-200">
          <div className="aspect-3/4 relative">
            <Image
              src="/teste-invoice.png"
              alt="Invoice"
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden shadow-md px-4 py-6 border-1 border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Extracted invoice details</h2>

          {status && (
            <Badge className="px-4 rounded-full">{status}</Badge>
          )}
        </div>

        <Separator />

        {/* Invoice details */}
        <div className="flex flex-col gap-4 py-4">
          {invoiceNumber && (
            <InvoiceDetailsLabel
              label="Invoice number"
              value={invoiceNumber}
              icon={<FileDigit />}
            />
          )}

          {from && from.name && (
            <InvoiceDetailsLabel
              label="From"
              value={from.name}
              icon={<ShoppingBag />}
            />
          )}

          {to && to.name && (
            <InvoiceDetailsLabel
              label="To"
              value={to.name}
              icon={<User />}
            />
          )}

          {invoiceDueDate && (
            <InvoiceDetailsLabel
              label="Invoice due date"
              value={formatDate(invoiceDueDate)}
              icon={<Calendar />}
            />
          )}

          {invoiceDate && (
            <InvoiceDetailsLabel
              label="Invoice date"
              value={formatDate(invoiceDate)}
              icon={<Calendar />}
            />
          )}
        </div>

        <Separator />

        {/* Invoice Items */}
        {items && (
          <>
            <div className="flex items-center gap-2 py-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="text-md text-muted-foreground font-medium">Items ({items.length})</h3>
            </div>

            {items.map((item, idx) => (
              <div className={cn("flex justify-between items-center py-2 px-4 rounded-md", idx % 2 === 0 && "bg-gray-100")} key={idx}>
                <span className="text-sm">{item.name}</span>
                <span className="text-sm">{formatCurrency(item.price)}</span>
              </div>
            ))}

            <Separator className="my-4" />

            {totalAmount && (
              <div className="flex justify-between items-center py-2 px-4 rounded-md">
                <span className="text-sm">Total</span>
                <span className="text-sm">{formatCurrency(totalAmount)}</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-md px-4 py-6 border-1 border-gray-200">
        <div className="flex flex-col gap-4">
          {fileName && (
            <InvoiceDetailsLabel
              label="File name"
              value={fileName}
              icon={<FileArchive />}
            />
          )}

          {uploadedAt && (
            <InvoiceDetailsLabel
              label="Uploaded at"
              value={formatDate(uploadedAt)}
              icon={<Calendar />}
            />
          )}
        </div>
      </div>

      <Button>
        Download interactive PDF
      </Button>
    </div>
  )
}

export default InvoiceDetails;