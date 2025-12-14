import { Job } from "@/services/jobService";

// This is a Server Component by default in the Next.js App Router.
// It renders to HTML on the server and ships zero JS to the client unless interactivity is added.
const statusStyles: Record<Job["status"], string> = {
  Applied: "bg-blue-100 text-blue-700 border-blue-200",
  Interviewing: "bg-amber-100 text-amber-800 border-amber-200",
  Offer: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{job.title}</h3>
          <p className="text-sm text-zinc-600">{job.company}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[job.status]}`}
        >
          {job.status}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-zinc-700">{job.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
        <span className="font-medium text-zinc-800">{job.salary_range}</span>
        <span>Applied: {job.date_applied}</span>
      </div>
    </article>
  );
}
