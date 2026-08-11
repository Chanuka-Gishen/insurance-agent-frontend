import { ArrowLeft, Home } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          404
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Home size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
