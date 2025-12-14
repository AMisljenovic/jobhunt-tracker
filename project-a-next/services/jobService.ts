// Mock job service shared across the app.
// In a real app this would be a database call. In Next.js App Router this runs on the server (RSC), so no client JS is shipped.
// In Nuxt (Nitro) the same code can execute on the server during SSR or on the client during navigation.

export interface Job {
  id: number;
  title: string;
  company: string;
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  salary_range: string;
  description: string;
  date_applied: string;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Acme Corp',
    status: 'Interviewing',
    salary_range: '$140k - $170k',
    description: 'Lead the migration to a modern design system and improve performance.',
    date_applied: '2025-01-05',
  },
  {
    id: 2,
    title: 'Fullstack TypeScript Developer',
    company: 'Northwind Labs',
    status: 'Applied',
    salary_range: '$125k - $155k',
    description: 'Work across Next.js APIs and database integrations for internal tools.',
    date_applied: '2025-01-08',
  },
  {
    id: 3,
    title: 'Product Engineer',
    company: 'Fjord Finance',
    status: 'Offer',
    salary_range: '$150k - $185k + equity',
    description: 'Ship user-facing features end-to-end with close PM/design collaboration.',
    date_applied: '2024-12-18',
  },
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'BrightHealth',
    status: 'Interviewing',
    salary_range: '$110k - $135k',
    description: 'Own the patient portal UI with a11y and performance as first-class concerns.',
    date_applied: '2025-01-02',
  },
  {
    id: 5,
    title: 'Staff UI Engineer',
    company: 'Orbit Analytics',
    status: 'Rejected',
    salary_range: '$180k - $210k',
    description: 'Shape UI architecture and mentor teams building high-scale dashboards.',
    date_applied: '2024-12-10',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getJobs(): Promise<Job[]> {
  await delay(500);
  return [...mockJobs];
}

export async function getJobById(id: number): Promise<Job | undefined> {
  await delay(500);
  return mockJobs.find((job) => job.id === id);
}

export async function addJob(job: Omit<Job, 'id'>): Promise<Job> {
  await delay(500);
  const nextId = Math.max(...mockJobs.map((j) => j.id)) + 1;
  const newJob: Job = { id: nextId, ...job };
  mockJobs.push(newJob);
  return newJob;
}
