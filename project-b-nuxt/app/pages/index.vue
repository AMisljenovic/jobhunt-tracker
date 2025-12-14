<script setup lang="ts">
import type { Job } from "~/services/jobService";
import { getJobs } from "~/services/jobService";

// Nuxt "Universal Rendering" runs on server for first paint and on client for navigation/hydration.
// Nuxt 4 auto-imports components from app/components, so no explicit import needed for JobCard.
const jobs = ref<Job[]>([]);
jobs.value = await getJobs();
</script>

<template>
  <main class="min-h-screen bg-zinc-50 py-12 text-zinc-900">
    <section class="mx-auto flex max-w-5xl flex-col gap-6 px-6">
      <header class="flex flex-col gap-2">
        <p class="text-sm font-semibold text-emerald-700">JobHunt Tracker</p>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-sm text-zinc-600">
          Track applications across statuses with server-rendered data for fast initial paint.
        </p>
      </header>
      <div class="grid gap-4 md:grid-cols-2">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </section>
  </main>
</template>
