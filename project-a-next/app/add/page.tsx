import { createJob } from "./actions";

export default function AddJobPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-12 text-zinc-900">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-700">JobHunt Tracker</p>
          <h1 className="text-3xl font-bold">Add Job</h1>
          <p className="text-sm text-zinc-600">
            Server Action handles submission on the server without a client-side fetch.
          </p>
        </header>

        <form
          action={createJob}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800">
              Title
              <input
                name="title"
                required
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                placeholder="Senior Frontend Engineer"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800">
              Company
              <input
                name="company"
                required
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                placeholder="Acme Corp"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800">
              Status
              <select
                name="status"
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                defaultValue="Applied"
              >
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800">
              Salary range
              <input
                name="salary_range"
                required
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                placeholder="$140k - $170k"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800 md:col-span-2">
              Description
              <textarea
                name="description"
                required
                rows={4}
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                placeholder="What does this role own?"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-800">
              Date applied
              <input
                type="date"
                name="date_applied"
                required
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Save job
          </button>
        </form>
      </section>
    </main>
  );
}
