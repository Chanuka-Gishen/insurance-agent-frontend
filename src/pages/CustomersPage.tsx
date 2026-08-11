import { useEffect, useState } from "react";

import { Plus, RefreshCw, Users } from "lucide-react";

import { Link } from "react-router-dom";

import CustomerCard from "../components/customers/CustomerCard";
import CustomerListSkeleton from "../components/customers/CustomerListSkeleton";
import CustomerSearch from "../components/customers/CustomerSearch";
import CustomerStatusFilter, {
  type CustomerStatus,
} from "../components/customers/CustomerStatusFilter";
import CustomerTable from "../components/customers/CustomerTable";

import { useCustomers } from "../hooks/customers/useCustomers";
import { PAGE_SIZE } from "../constants/common.constants";
import CustomerPagination from "../components/customers/CustomerPagination";

const CustomersPage = () => {
  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<CustomerStatus>("active");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [searchInput]);

  const isActive = status === "all" ? undefined : status === "active";

  const { data, isLoading, isError, error, refetch, isFetching } = useCustomers(
    {
      page,
      limit: PAGE_SIZE,
      search: search || undefined,
      isActive,
    },
  );

  const customers = data?.customers ?? [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Customers</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Customer List
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Search and manage your insurance customers.
          </p>
        </div>

        <Link
          to="/customers/create"
          className="hidden items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex"
        >
          <Plus size={18} />
          Add Customer
        </Link>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto]">
        <CustomerSearch value={searchInput} onChange={setSearchInput} />

        <div className="lg:w-72">
          <CustomerStatusFilter value={status} onChange={setStatus} />
        </div>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <CustomerListSkeleton />
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">Unable to load customers</p>

            <p className="mt-1 text-sm text-red-600">
              {error instanceof Error ? error.message : "Something went wrong."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : customers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Users size={22} />
            </div>

            <h2 className="mt-4 font-semibold text-slate-900">
              No customers found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try another search term."
                : "Add your first customer to get started."}
            </p>

            {!search && (
              <Link
                to="/customers/create"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={17} />
                Add Customer
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {data?.pagination?.total ?? customers.length} customer
                {(data?.pagination?.total ?? customers.length) === 1 ? "" : "s"}
              </p>

              {isFetching && (
                <RefreshCw size={16} className="animate-spin text-slate-400" />
              )}
            </div>

            <div className="space-y-3 md:hidden">
              {customers.map((customer) => (
                <CustomerCard key={customer._id} customer={customer} />
              ))}
            </div>

            <div className="hidden md:block">
              <CustomerTable customers={customers} />
            </div>

            {data?.pagination && (
              <CustomerPagination
                page={data.pagination.page}
                totalPages={data.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
