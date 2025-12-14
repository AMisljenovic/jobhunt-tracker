import JobCard from "@/components/JobCard";
import { getJobs } from "@/services/jobService";

// React Server Components (RSC) fetch data on the server before HTML is sent.
// Next.js dedupes these fetches automatically across the tree.
export default async function Home() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-zinc-50 py-12 text-zinc-900">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-700">JobHunt Tracker</p>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-zinc-600">
            Track applications across statuses with server-rendered data for fast initial paint.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
