<script setup lang="ts">
import { getJobById } from "~/services/jobService";
import type { Job } from "~/services/jobService";

// File-system routing uses the filename [id].vue; the global route object exposes params for the page.
const route = useRoute();
const jobId = Number(route.params.id);

const job = ref<Job | undefined>();

job.value = await getJobById(jobId);
</script>

<template>
  <main class="min-h-screen bg-zinc-50 py-12 text-zinc-900">
    <section class="mx-auto flex max-w-3xl flex-col gap-6 px-6">
      <header class="flex flex-col gap-2">
        <p class="text-sm font-semibold text-emerald-700">JobHunt Tracker</p>
        <h1 v-if="job" class="text-3xl font-bold">{{ job.title }}</h1>
        <p v-if="job" class="text-sm text-zinc-600">{{ job.company }}</p>
      </header>

      <div v-if="job" class="flex flex-col gap-4">
        <JobCard :job="job" />
        <div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h2 class="text-lg font-semibold text-zinc-900">Description</h2>
          <p class="mt-2 whitespace-pre-line text-sm text-zinc-700">{{ job.description }}</p>
          <p class="mt-4 text-sm text-zinc-600">Applied: {{ job.date_applied }}</p>
        </div>
      </div>

      <p v-else class="text-center text-lg font-medium text-zinc-700">Job not found</p>
    </section>
  </main>
</template>
