import { useParams } from "react-router-dom";

import { useCustomer } from "../hooks/customers/useCustomer";

const CustomerDetailsPage = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data: customer, isLoading, isError } = useCustomer(id ?? "");

  if (isLoading) {
    return <p className="text-slate-500">Loading customer...</p>;
  }

  if (isError || !customer) {
    return <p className="text-red-600">Unable to load customer.</p>;
  }

  return (
    <div>
      <p className="text-sm font-medium text-blue-600">Customer</p>

      <h1 className="mt-1 text-2xl font-bold text-slate-900">
        {customer.fullName}
      </h1>

      <p className="mt-2 text-slate-500">{customer.phone}</p>
    </div>
  );
};

export default CustomerDetailsPage;
