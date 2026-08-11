import { useEffect, useMemo, useState } from "react";

import { RefreshCw, ShieldAlert } from "lucide-react";

import RenewalCard from "../components/renewals/RenewalCard";
import RenewalFilters, {
  type RenewalExpiryFilter,
} from "../components/renewals/RenewalFilters";
import RenewalPagination from "../components/renewals/RenewalPagination";
import RenewalsTable from "../components/renewals/RenewalsTable";

import type {
  GlobalInsuranceListParams,
  InsuranceType,
} from "../types/insurance.types";

import { getDateAfterDays, getTodayDate } from "../utils/insurance";
import { useInsurances } from "../hooks/insurances/useInsurances";

const PAGE_SIZE = 20;

const RenewalsPage = () => {
  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const [expiryFilter, setExpiryFilter] = useState<RenewalExpiryFilter>("30");

  const [insuranceType, setInsuranceType] = useState<InsuranceType | "">("");

  const [productCode, setProductCode] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());

      setPage(1);
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const queryParams = useMemo<GlobalInsuranceListParams>(() => {
    const params: GlobalInsuranceListParams = {
      page,
      limit: PAGE_SIZE,

      search: search || undefined,

      insuranceType: insuranceType || undefined,

      productCode: productCode || undefined,

      status: "active",

      sortBy: "expiryDate",

      sortOrder: "asc",
    };

    switch (expiryFilter) {
      case "expired":
        params.expiryTo = getTodayDate();

        break;

      case "7":
        params.expiryFrom = getTodayDate();

        params.expiryTo = getDateAfterDays(7);

        break;

      case "30":
        params.expiryFrom = getTodayDate();

        params.expiryTo = getDateAfterDays(30);

        break;

      case "60":
        params.expiryFrom = getTodayDate();

        params.expiryTo = getDateAfterDays(60);

        break;

      case "all":
        break;
    }

    return params;
  }, [page, search, insuranceType, productCode, expiryFilter]);

  const { data, isLoading, isError, error, isFetching, refetch } =
    useInsurances(queryParams);

  const insurances = data?.insurances ?? [];

  const pagination = data?.pagination;

  const handleExpiryChange = (value: RenewalExpiryFilter) => {
    setExpiryFilter(value);

    setPage(1);
  };

  const handleTypeChange = (value: InsuranceType | "") => {
    setInsuranceType(value);

    setProductCode("");

    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Renewals</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Insurance Renewals
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Policies requiring renewal attention based on their expiry dates.
          </p>
        </div>

        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <RefreshCw size={16} className="animate-spin" />
            Updating
          </div>
        )}
      </div>

      <div className="mt-6">
        <RenewalFilters
          search={searchInput}
          onSearchChange={setSearchInput}
          expiryFilter={expiryFilter}
          onExpiryFilterChange={handleExpiryChange}
          insuranceType={insuranceType}
          onInsuranceTypeChange={handleTypeChange}
          productCode={productCode}
          onProductCodeChange={(value) => {
            setProductCode(value);

            setPage(1);
          }}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-2xl bg-slate-200 md:h-16"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">Unable to load renewals</p>

            <p className="mt-1 text-sm text-red-600">
              {error instanceof Error ? error.message : "Something went wrong."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm"
            >
              Try again
            </button>
          </div>
        ) : insurances.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <ShieldAlert size={22} />
            </div>

            <h2 className="mt-4 font-semibold text-slate-900">
              No policies found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              No insurance policies match the selected renewal filters.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {pagination?.total ?? insurances.length}{" "}
                {(pagination?.total ?? insurances.length) === 1
                  ? "policy"
                  : "policies"}
              </p>
            </div>

            <div className="space-y-3 md:hidden">
              {insurances.map((insurance) => (
                <RenewalCard key={insurance._id} insurance={insurance} />
              ))}
            </div>

            <div className="hidden md:block">
              <RenewalsTable insurances={insurances} />
            </div>

            {pagination && (
              <RenewalPagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RenewalsPage;
