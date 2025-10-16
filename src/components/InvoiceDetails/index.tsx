import { Calendar, FileArchive, FileDigit, ShoppingBag, User } from "lucide-react"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { cn } from "@/utils/cn"
import { formatCurrency, formatDate } from "@/utils/format"
import { Button } from "../ui/button"
import { INVOICE_STATUS } from "@/constants/invoice.constants"
import { Spinner } from "../ui/spinner"
import { InvoiceDTO } from "@/types/services/IInvoice.service"

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

const InvoiceDetails = (invoiceDetailsProps: InvoiceDTO) => {
  return (
    <div className="flex flex-col gap-4">
      {invoiceDetailsProps.invoiceUrl && (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border-1 border-gray-200">
          <div className="aspect-3/4 relative">
            <Image
              src={invoiceDetailsProps.invoiceUrl}
              alt="Invoice image"
              className="w-full h-full object-cover"
              fill
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden shadow-md px-4 py-6 border-1 border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Extracted invoice details</h2>

          {invoiceDetailsProps.invoiceStatus && (
            <Badge className="px-4 rounded-full">{invoiceDetailsProps.invoiceStatus}</Badge>
          )}
        </div>

        <Separator />

        {/* Invoice details */}
        {invoiceDetailsProps.invoiceStatus === INVOICE_STATUS.ANALYZED && (
          <div>
            <div className="flex flex-col gap-4 py-4">
              {invoiceDetailsProps.invoiceNumber && (
                <InvoiceDetailsLabel
                  label="Invoice number"
                  value={invoiceDetailsProps.invoiceNumber}
                  icon={<FileDigit />}
                />
              )}

              {invoiceDetailsProps.shipperName && (
                <InvoiceDetailsLabel
                  label="From"
                  value={invoiceDetailsProps.shipperName}
                  icon={<ShoppingBag />}
                />
              )}

              {invoiceDetailsProps.consigneeName && (
                <InvoiceDetailsLabel
                  label="To"
                  value={invoiceDetailsProps.consigneeName}
                  icon={<User />}
                />
              )}

              {invoiceDetailsProps.invoiceDate && (
                <InvoiceDetailsLabel
                  label="Invoice date"
                  value={formatDate(invoiceDetailsProps.invoiceDate)}
                  icon={<Calendar />}
                />
              )}
            </div>

            <Separator />

            {/* Invoice Items */}
            {invoiceDetailsProps.invoiceItems && (
              <>
                <div className="flex items-center gap-2 pt-4 pb-6">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="text-md text-muted-foreground font-medium">Items ({invoiceDetailsProps.invoiceItems.length})</h3>
                </div>


                {invoiceDetailsProps.invoiceItems.map((item, idx) => (
                  <div className={cn("flex justify-between items-center py-2 px-4 rounded-md", idx % 2 === 0 && "bg-gray-100")} key={idx}>
                    <div className="text-right gap-2 flex">
                      <span className="text-sm">{item.itemQuantity}x</span>
                      <span className="text-sm">{item.itemName}</span>
                    </div>
                    <div>
                      <div className="text-right gap-2 flex justify-end">
                        <span className="text-sm">{formatCurrency(item.itemPrice)}</span>
                        <span className="text-sm text-muted-foreground">each</span>
                      </div>
                      <div className="text-right gap-2 flex justify-end">
                        <span className="text-sm">{formatCurrency(item.itemTotal)}</span>
                        <span className="text-sm text-muted-foreground">total</span>
                      </div>
                    </div>
                  </div>
                ))}


                <Separator className="my-4" />

                {invoiceDetailsProps.invoiceTax && (
                  <div className="flex justify-between items-center py-2 px-4 rounded-md">
                    <span className="text-sm">Tax</span>
                    <span className="text-sm">{formatCurrency(invoiceDetailsProps.invoiceTax)}</span>
                  </div>
                )}

                {invoiceDetailsProps.invoiceAmount && (
                  <div className="flex justify-between items-center py-2 px-4 rounded-md">
                    <span className="text-sm">Total</span>
                    <span className="text-sm">{formatCurrency(invoiceDetailsProps.invoiceAmount)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}


        {invoiceDetailsProps.invoiceItems && invoiceDetailsProps.invoiceStatus !== INVOICE_STATUS.ANALYZED && (
          <>
            <div className="mt-4 text-center text-gray-500">
              <Spinner className="mx-auto mb-4 h-12 w-12" />
              <h2 className="text-xl font-bold">Invoice has been processed.</h2>
              <p className="mt-2">The invoice is still being processed. Please check back later.</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-md px-4 py-6 border-1 border-gray-200">
        <div className="flex flex-col gap-4">
          {invoiceDetailsProps.fileOriginalName && (
            <InvoiceDetailsLabel
              label="File name"
              value={invoiceDetailsProps.fileOriginalName}
              icon={<FileArchive />}
            />
          )}

          {invoiceDetailsProps.createdAt && (
            <InvoiceDetailsLabel
              label="Created at"
              value={formatDate(invoiceDetailsProps.createdAt)}
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