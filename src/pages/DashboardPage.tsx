import { CalendarClock, RefreshCw, ShieldAlert, Users } from "lucide-react";

import DashboardFollowUpCard from "../components/dashboard/DashboardFollowUpCard";
import DashboardRenewalCard from "../components/dashboard/DashboardRenewalCard";
import DashboardSection from "../components/dashboard/DashboardSection";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";

import { useDashboardFollowUps } from "../hooks/dashboard/useDashboardFollowUps";

import { useDashboardRenewals } from "../hooks/dashboard/useDashboardRenewals";

import { useDashboardSummary } from "../hooks/dashboard/useDashboardSummary";

const DashboardPage = () => {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();

  const { data: todayData, isLoading: todayLoading } = useDashboardFollowUps(
    "today",
    5,
  );

  const { data: overdueData, isLoading: overdueLoading } =
    useDashboardFollowUps("overdue", 5);

  const { data: renewalsData, isLoading: renewalsLoading } =
    useDashboardRenewals(30, 5);

  return (
    <div>
      <div>
        <p className="text-sm font-medium text-blue-600">Dashboard</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here's what needs your attention today.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <DashboardStatCard
          label="Today Follow-ups"
          value={summaryLoading ? 0 : (summary?.todayFollowUps ?? 0)}
          icon={CalendarClock}
          color="blue"
        />

        <DashboardStatCard
          label="Overdue"
          value={summaryLoading ? 0 : (summary?.overdueFollowUps ?? 0)}
          icon={ShieldAlert}
          color="red"
        />

        <DashboardStatCard
          label="Expiring ≤30 Days"
          value={summaryLoading ? 0 : (summary?.expiringWithin30Days ?? 0)}
          icon={RefreshCw}
          color="amber"
        />

        <DashboardStatCard
          label="Active Customers"
          value={summaryLoading ? 0 : (summary?.activeCustomers ?? 0)}
          icon={Users}
          color="emerald"
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <DashboardSection
          title="Today's Follow-ups"
          subtitle={
            todayData
              ? `${todayData.total} customer${
                  todayData.total === 1 ? "" : "s"
                } due today`
              : undefined
          }
          link="/customers"
          linkLabel="Customers"
        >
          {todayLoading ? (
            <DashboardListSkeleton />
          ) : (
            <div className="space-y-3">
              {todayData?.customers.length ? (
                todayData.customers.map((customer) => (
                  <DashboardFollowUpCard
                    key={customer._id}
                    customer={customer}
                  />
                ))
              ) : (
                <EmptyState text="No follow-ups due today." />
              )}
            </div>
          )}
        </DashboardSection>

        <DashboardSection
          title="Overdue Follow-ups"
          subtitle={
            overdueData
              ? `${overdueData.total} overdue customer${
                  overdueData.total === 1 ? "" : "s"
                }`
              : undefined
          }
          link="/customers"
          linkLabel="Customers"
        >
          {overdueLoading ? (
            <DashboardListSkeleton />
          ) : (
            <div className="space-y-3">
              {overdueData?.customers.length ? (
                overdueData.customers.map((customer) => (
                  <DashboardFollowUpCard
                    key={customer._id}
                    customer={customer}
                    overdue
                  />
                ))
              ) : (
                <EmptyState text="No overdue follow-ups." />
              )}
            </div>
          )}
        </DashboardSection>
      </div>

      <div className="mt-5">
        <DashboardSection
          title="Renewals Needing Attention"
          subtitle={
            renewalsData
              ? `${renewalsData.total} polic${
                  renewalsData.total === 1 ? "y" : "ies"
                } expiring within 30 days`
              : undefined
          }
          link="/renewals"
          linkLabel="View renewals"
        >
          {renewalsLoading ? (
            <DashboardListSkeleton />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {renewalsData?.insurances.length ? (
                renewalsData.insurances.map((insurance) => (
                  <DashboardRenewalCard
                    key={insurance._id}
                    insurance={insurance}
                  />
                ))
              ) : (
                <div className="md:col-span-2 xl:col-span-3">
                  <EmptyState text="No policies expiring within 30 days." />
                </div>
              )}
            </div>
          )}
        </DashboardSection>
      </div>
    </div>
  );
};

const DashboardListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-24 animate-pulse rounded-xl bg-slate-100"
        />
      ))}
    </div>
  );
};

const EmptyState = ({ text }: { text: string }) => {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
};

export default DashboardPage;
