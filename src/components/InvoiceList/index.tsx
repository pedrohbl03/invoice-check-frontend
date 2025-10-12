import InvoiceCard from "../InvoiceCard";

const InvoiceList = ({
  invoices,
}: {
  invoices: any[];
}) => {

  return (
    <div>
      <div className="mt-8 mb-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Invoice List</h2>
        <p className="text-sm text-gray-500">
          Here you can see the list of invoices uploaded by the user and analyze the data of each invoice.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
