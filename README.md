# JobHunt Tracker (Next.js vs Nuxt 3)

Parallel implementations to compare frameworks with shared Job model and mock service.

## Run Project A (Next.js 14 App Router)
```bash
cd project-a-next
npm install
npm run dev
```

## Run Project B (Nuxt 3)
```bash
cd project-b-nuxt
npm install
npm run dev
```

Key features: shared `services/jobService.ts`, matching UI components (`JobCard`), dashboard, job details, and add-job form (Server Action in Next, `v-model` in Nuxt).
