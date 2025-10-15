import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const InvoiceCard = ({
  invoice,
}: {
  invoice: any;
}) => {

  /* Image of invoice */
  return (
    <Link href={`/${invoice.id}`}>
      <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <div className="aspect-3/4 relative">
          <Image
            src="/teste-invoice.png"
            alt={invoice.fileOriginalName}
            className="w-full h-full object-cover"
            fill
          />
        </div>


        {/* mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent/50" />
      </div>
    </Link>
  );
}

export default InvoiceCard;