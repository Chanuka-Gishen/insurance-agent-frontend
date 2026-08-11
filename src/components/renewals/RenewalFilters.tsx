import type { InsuranceType } from "../../types/insurance.types";

import {
  INSURANCE_PRODUCTS,
  INSURANCE_TYPES,
} from "../../constants/insurance.constants";

export type RenewalExpiryFilter = "all" | "expired" | "7" | "30" | "60";

interface RenewalFiltersProps {
  search: string;

  onSearchChange: (value: string) => void;

  expiryFilter: RenewalExpiryFilter;

  onExpiryFilterChange: (value: RenewalExpiryFilter) => void;

  insuranceType: InsuranceType | "";

  onInsuranceTypeChange: (value: InsuranceType | "") => void;

  productCode: string;

  onProductCodeChange: (value: string) => void;
}

const inputClassName =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const RenewalFilters = ({
  search,
  onSearchChange,

  expiryFilter,
  onExpiryFilterChange,

  insuranceType,
  onInsuranceTypeChange,

  productCode,
  onProductCodeChange,
}: RenewalFiltersProps) => {
  const products = insuranceType ? INSURANCE_PRODUCTS[insuranceType] : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid gap-3 lg:grid-cols-4">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search policy, proposal, vehicle..."
          className={inputClassName}
        />

        <select
          value={expiryFilter}
          onChange={(event) =>
            onExpiryFilterChange(event.target.value as RenewalExpiryFilter)
          }
          className={inputClassName}
        >
          <option value="all">All Expiries</option>

          <option value="expired">Expired</option>

          <option value="7">Expiring in 7 Days</option>

          <option value="30">Expiring in 30 Days</option>

          <option value="60">Expiring in 60 Days</option>
        </select>

        <select
          value={insuranceType}
          onChange={(event) => {
            onInsuranceTypeChange(event.target.value as InsuranceType | "");

            onProductCodeChange("");
          }}
          className={inputClassName}
        >
          <option value="">All Insurance Types</option>

          {INSURANCE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <select
          value={productCode}
          disabled={!insuranceType}
          onChange={(event) => onProductCodeChange(event.target.value)}
          className={inputClassName}
        >
          <option value="">All Products</option>

          {products.map((product) => (
            <option key={product.code} value={product.code}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RenewalFilters;
