export type CustomerStatus = "all" | "active" | "inactive";

interface CustomerStatusFilterProps {
  value: CustomerStatus;

  onChange: (value: CustomerStatus) => void;
}

const CustomerStatusFilter = ({
  value,
  onChange,
}: CustomerStatusFilterProps) => {
  const items: {
    label: string;
    value: CustomerStatus;
  }[] = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];

  return (
    <div className="flex rounded-xl bg-slate-100 p-1">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={[
            "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition",
            value === item.value
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800",
          ].join(" ")}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default CustomerStatusFilter;
