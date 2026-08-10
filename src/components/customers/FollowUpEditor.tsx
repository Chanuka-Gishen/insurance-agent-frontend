import { useState } from "react";

import { CalendarClock, Check } from "lucide-react";

import { useUpdateFollowUp } from "../../hooks/customers/useUpdateFollowUp";

import type { Customer } from "../../types/customer.types";

import { getApiErrorMessage } from "../../utils/api.utils";

interface FollowUpEditorProps {
  customer: Customer;
}

const FollowUpEditor = ({ customer }: FollowUpEditorProps) => {
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    customer.nextFollowUpDate ? customer.nextFollowUpDate.slice(0, 10) : "",
  );

  const [followUpNote, setFollowUpNote] = useState(customer.followUpNote ?? "");

  const { mutateAsync, isPending, error, isSuccess } = useUpdateFollowUp();

  const handleSave = async () => {
    await mutateAsync({
      id: customer._id,

      payload: {
        nextFollowUpDate: nextFollowUpDate || undefined,

        followUpNote: followUpNote.trim() || undefined,
      },
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarClock size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">Update Follow-up</h2>

          <p className="text-sm text-slate-500">
            Schedule the next customer contact.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-slate-700">
          Next Follow-up Date
        </label>

        <input
          type="date"
          value={nextFollowUpDate}
          onChange={(event) => setNextFollowUpDate(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700">
          Follow-up Note
        </label>

        <textarea
          value={followUpNote}
          onChange={(event) => setFollowUpNote(event.target.value)}
          placeholder="What should you discuss next time?"
          className="mt-2 min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {getApiErrorMessage(error, "Unable to update follow-up.")}
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
          <Check size={16} />
          Follow-up updated.
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={isPending}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        <CalendarClock size={17} />

        {isPending ? "Saving..." : "Save Follow-up"}
      </button>
    </section>
  );
};

export default FollowUpEditor;
