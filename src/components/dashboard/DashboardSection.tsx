import type { ReactNode } from "react";

import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

interface Props {
  title: string;

  subtitle?: string;

  link?: string;
  linkLabel?: string;

  children: ReactNode;
}

const DashboardSection = ({
  title,
  subtitle,
  link,
  linkLabel = "View all",
  children,
}: Props) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {link && (
          <Link
            to={link}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {linkLabel}

            <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
};

export default DashboardSection;
