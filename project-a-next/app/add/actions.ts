'use server';

import { addJob } from "@/services/jobService";
import { redirect } from "next/navigation";

// Server Actions let forms call server-side logic directly (stable in Next 14), no custom API route needed.
export async function createJob(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const status = (formData.get("status") || "Applied") as
    | "Applied"
    | "Interviewing"
    | "Offer"
    | "Rejected";
  const salary_range = String(formData.get("salary_range") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date_applied = String(formData.get("date_applied") || "").trim();

  await addJob({ title, company, status, salary_range, description, date_applied });
  redirect("/");
}
