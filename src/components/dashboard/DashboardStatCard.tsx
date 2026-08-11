import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  icon: LucideIcon;

  color?: "blue" | "red" | "amber" | "emerald";
}

const colors = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
  },

  red: {
    icon: "bg-red-50 text-red-600",
  },

  amber: {
    icon: "bg-amber-50 text-amber-600",
  },

  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
  },
};

const DashboardStatCard = ({
  label,
  value,
  icon: Icon,
  color = "blue",
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            {value}
          </p>
        </div>

        <div
          className={[
            "flex h-11 w-11 items-center justify-center rounded-xl",
            colors[color].icon,
          ].join(" ")}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
