<script setup lang="ts">
import type { Job } from "~/services/jobService";

// Vue's template syntax keeps markup separate from logic, while defineProps is a compile-time macro.
const props = defineProps<{ job: Job }>();

const statusStyles: Record<Job["status"], string> = {
  Applied: "bg-blue-100 text-blue-700 border-blue-200",
  Interviewing: "bg-amber-100 text-amber-800 border-amber-200",
  Offer: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-800 border-rose-200",
};
</script>

<template>
  <article
    class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-lg font-semibold text-zinc-900">{{ props.job.title }}</h3>
        <p class="text-sm text-zinc-600">{{ props.job.company }}</p>
      </div>
      <span
        class="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold"
        :class="statusStyles[props.job.status]"
      >
        {{ props.job.status }}
      </span>
    </div>
    <p class="mt-3 line-clamp-3 text-sm text-zinc-700">{{ props.job.description }}</p>
    <div class="mt-4 flex items-center justify-between text-sm text-zinc-600">
      <span class="font-medium text-zinc-800">{{ props.job.salary_range }}</span>
      <span>Applied: {{ props.job.date_applied }}</span>
    </div>
  </article>
</template>
