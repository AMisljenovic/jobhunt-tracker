<script setup lang="ts">
import { addJob } from "~/services/jobService";
import type { Job } from "~/services/jobService";

// v-model provides two-way binding, so we avoid React-style controlled inputs (value + onChange) for simpler forms.
const form = reactive<Omit<Job, "id">>({
  title: "",
  company: "",
  status: "Applied",
  salary_range: "",
  description: "",
  date_applied: "",
});

const submitting = ref(false);
const saved = ref(false);

const statusOptions: Job["status"][] = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
];

async function handleSubmit() {
  submitting.value = true;
  saved.value = false;
  await addJob({ ...form });
  saved.value = true;
  submitting.value = false;
  Object.assign(form, {
    title: "",
    company: "",
    status: "Applied",
    salary_range: "",
    description: "",
    date_applied: "",
  });
}
</script>

<template>
  <main class="min-h-screen bg-zinc-50 py-12 text-zinc-900">
    <section class="mx-auto flex max-w-3xl flex-col gap-6 px-6">
      <header class="flex flex-col gap-2">
        <p class="text-sm font-semibold text-emerald-700">JobHunt Tracker</p>
        <h1 class="text-3xl font-bold">Add Job</h1>
        <p class="text-sm text-zinc-600">
          Form uses v-model and calls the service directly; Nuxt can run this on server (SSR) or client.
        </p>
      </header>

      <form
        class="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-4 md:grid-cols-2">
          <label class="flex flex-col gap-2 text-sm font-medium text-zinc-800">
            Title
            <input
              v-model="form.title"
              required
              class="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="Senior Frontend Engineer"
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-zinc-800">
            Company
            <input
              v-model="form.company"
              required
              class="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="Acme Corp"
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-zinc-800">
            Status
            <select
              v-model="form.status"
              class="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option v-for="status in statusOptions" :key="status">{{ status }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-zinc-800">
            Salary range
            <input
              v-model="form.salary_range"
              required
              class="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="$140k - $170k"
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-zinc-800 md:col-span-2">
            Description
            <textarea
              v-model="form.description"
              required
              rows="4"
              class="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              placeholder="What does this role own?"
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-zinc-800">
            Date applied
            <input
              v-model="form.date_applied"
              type="date"
              required
              class="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </label>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {{ submitting ? "Saving..." : "Save job" }}
        </button>

        <p v-if="saved" class="mt-3 text-sm font-medium text-emerald-700">Saved!</p>
      </form>
    </section>
  </main>
</template>
