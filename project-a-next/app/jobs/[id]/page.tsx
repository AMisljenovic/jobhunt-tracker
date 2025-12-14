import JobCard from "@/components/JobCard";
import { getJobById } from "@/services/jobService";

// File-system routing uses the folder name [id]; params are passed as props to the page component.
export default async function JobDetails({ params }: { params: { id: string } }) {
  const jobId = Number(params.id);
  const job = await getJobById(jobId);

  if (!job) {
    return (
      <main className="min-h-screen bg-zinc-50 py-12 text-center text-zinc-700">
        <p className="text-lg font-medium">Job not found</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 py-12 text-zinc-900">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-emerald-700">JobHunt Tracker</p>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-sm text-zinc-600">{job.company}</p>
        </header>
        <JobCard job={job} />
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">Description</h2>
          <p className="mt-2 text-sm text-zinc-700 whitespace-pre-line">{job.description}</p>
          <p className="mt-4 text-sm text-zinc-600">Applied: {job.date_applied}</p>
        </div>
      </section>
    </main>
  );
}
