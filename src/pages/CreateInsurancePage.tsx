import { ArrowLeft } from "lucide-react";

import { Link, useParams } from "react-router-dom";

const CreateInsurancePage = () => {
  const { customerId } = useParams<{
    customerId: string;
  }>();

  return (
    <div>
      <Link
        to={`/customers/${customerId}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Customer Details
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
        Add Insurance
      </h1>

      <p className="mt-2 text-slate-500">
        Add a new insurance policy for this customer.
      </p>
    </div>
  );
};

export default CreateInsurancePage;
