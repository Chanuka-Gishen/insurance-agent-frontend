const CustomerListSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="h-4 w-40 rounded bg-slate-200" />

          <div className="mt-3 h-3 w-28 rounded bg-slate-100" />

          <div className="mt-5 h-10 rounded-xl bg-slate-100" />
        </div>
      ))}
    </div>
  );
};

export default CustomerListSkeleton;
