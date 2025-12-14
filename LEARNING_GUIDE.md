# 📚 JobHunt Tracker - Learning Guide

> A side-by-side comparison of **Next.js 14 (App Router)** and **Nuxt 3** for building the same application.

---

## 🎯 Project Overview

**JobHunt Tracker** is a simple job application tracking tool that lets you:
- View a dashboard of all job applications
- See details of individual applications
- Add new job applications

We built the **exact same app** in two modern frameworks to understand their differences and similarities. This guide will help you understand *why* each framework makes certain design decisions.

---

## 🏗️ Architecture Comparison (The "Mental Model")

### File Structure Side-by-Side

| Feature | Next.js 14 (App Router) | Nuxt 3 |
|---------|------------------------|--------|
| **Dashboard Page** | `app/page.tsx` | `app/pages/index.vue` |
| **Job Details Page** | `app/jobs/[id]/page.tsx` | `app/pages/jobs/[id].vue` |
| **Add Job Page** | `app/add/page.tsx` | `app/pages/add.vue` |
| **Job Card Component** | `components/JobCard.tsx` | `app/components/JobCard.vue` |
| **Global Layout** | `app/layout.tsx` | `app/layouts/default.vue` |
| **Data Service** | `services/jobService.ts` | `app/services/jobService.ts` |
| **Server Actions** | `app/add/actions.ts` | N/A (uses composables) |

### Key Observations

1. **Next.js uses folders for dynamic routes** (`[id]/page.tsx`), while **Nuxt uses filenames** (`[id].vue`)
2. **Nuxt 4 puts everything in `app/`** directory, similar to Next.js App Router
3. **Next.js separates server logic** into `actions.ts`, while Nuxt handles it inline or via API routes

---

## 🧠 Key Concepts Explained (Deep Dive)

### 1. Routing: Folder-based vs File-based

#### Next.js (Folder-based)
```
app/
├── page.tsx           → /
├── add/
│   └── page.tsx       → /add
└── jobs/
    └── [id]/
        └── page.tsx   → /jobs/1, /jobs/2, etc.
```

In Next.js, **every route is a folder** containing a `page.tsx` file. The folder name becomes the URL segment. Dynamic segments use `[brackets]`.

**Why this design?** It allows co-locating related files (loading states, error boundaries, layouts) in the same folder.

#### Nuxt (File-based)
```
app/pages/
├── index.vue          → /
├── add.vue            → /add
└── jobs/
    └── [id].vue       → /jobs/1, /jobs/2, etc.
```

In Nuxt, **the filename IS the route**. `index.vue` is the root, other files become their URL. Dynamic segments also use `[brackets]` but in the filename.

**Why this design?** Simpler mental model - one file = one page. Less nesting for simple apps.

---

### 2. Data Fetching: Server Components vs Composables

#### Next.js (Async Server Components)
```tsx
// app/page.tsx
export default async function Home() {
  const jobs = await getJobs();  // Runs on SERVER
  return <JobList jobs={jobs} />;
}
```

**How it works:**
- The component itself is `async`
- Data fetching happens on the **server before HTML is sent**
- Zero JavaScript shipped to client for this code
- Next.js automatically dedupes identical requests

#### Nuxt (useFetch Composable)
```vue
<script setup lang="ts">
const jobs = ref<Job[]>([]);
jobs.value = await getJobs();  // Runs on SERVER during SSR
</script>
```

**How it works:**
- `<script setup>` runs during SSR on the server
- On client navigation, the same code runs on the client
- `useFetch` composable handles caching and prevents waterfalls
- Data is automatically serialized and hydrated

**Key Difference:** Next.js RSC code *never* runs on client. Nuxt code runs on *both* server and client (universal).

---

### 3. Interactivity: 'use client' vs Default Behavior

#### Next.js (Explicit Client Components)
```tsx
// This is a SERVER component by default (no JS shipped)
export default function JobCard({ job }) {
  return <div>{job.title}</div>;
}

// To add interactivity, you MUST mark it:
'use client';
export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(true)}>Like</button>;
}
```

**Philosophy:** Server-first. You opt-in to client JS.

#### Nuxt (Everything is Interactive)
```vue
<script setup>
const liked = ref(false);  // Just works!
</script>

<template>
  <button @click="liked = true">Like</button>
</template>
```

**Philosophy:** Universal by default. Hydration handles interactivity automatically.

**Key Difference:** 
- Next.js: You decide what runs on client (smaller bundles, more control)
- Nuxt: Everything hydrates (simpler DX, potentially larger bundles)

---

### 4. Forms: Server Actions vs v-model

#### Next.js (Server Actions)
```tsx
// actions.ts
'use server';
export async function createJob(formData: FormData) {
  const title = formData.get('title');
  await db.insert({ title });
  redirect('/');
}

// page.tsx
<form action={createJob}>
  <input name="title" />
  <button type="submit">Save</button>
</form>
```

**How it works:**
- Form submits directly to server function
- No API route needed
- Works without JavaScript (progressive enhancement)

#### Nuxt (v-model Two-Way Binding)
```vue
<script setup>
const form = reactive({ title: '' });

async function handleSubmit() {
  await addJob(form);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.title" />
    <button type="submit">Save</button>
  </form>
</template>
```

**How it works:**
- `v-model` syncs input value with reactive state
- Submit handler calls service directly
- More familiar to traditional SPA developers

---

### 5. Navigation: Link vs NuxtLink

| Feature | Next.js `<Link>` | Nuxt `<NuxtLink>` |
|---------|-----------------|-------------------|
| **Prefetch Trigger** | Hover (default) | Viewport entry |
| **Client Navigation** | ✅ Yes | ✅ Yes |
| **SEO Friendly** | ✅ Renders as `<a>` | ✅ Renders as `<a>` |
| **Active Class** | Manual | Automatic (`exact-active-class`) |

---

## 🚀 How to Run

### Start Next.js (Project A)
```bash
cd project-a-next
npm install
npm run dev
# Open http://localhost:3000
```

### Start Nuxt (Project B)
```bash
cd project-b-nuxt
npm install
npm run dev
# Open http://localhost:3000
```

> **Tip:** Run them on different ports to compare side-by-side:
> ```bash
> # Terminal 1
> cd project-a-next && npm run dev -- -p 3001
> 
> # Terminal 2
> cd project-b-nuxt && npm run dev -- -p 3002
> ```

---

## 📝 Study Exercises (Homework)

Try these tasks to deepen your understanding:

### Exercise 1: Add a Delete Button
**Goal:** Add a "Delete" button to each JobCard that removes the job.

**Hints:**
- Next.js: Create a Server Action in `actions.ts`, use a `<form>` with hidden input for job ID
- Nuxt: Add a `deleteJob` function to the service, call it from a button click handler

**Learning:** How each framework handles mutations/side effects.

---

### Exercise 2: Add Status Filter
**Goal:** Add dropdown filters on the dashboard to show only jobs with a specific status (Applied, Interviewing, etc.)

**Hints:**
- Next.js: This requires `'use client'` because filtering is interactive! Use `useState` + `useMemo`
- Nuxt: Use `ref` for selected status, `computed` for filtered list

**Learning:** When you need client-side state vs server-side rendering.

---

### Exercise 3: Add Job Edit Page
**Goal:** Create `/jobs/[id]/edit` page that pre-fills a form with existing job data.

**Hints:**
- Next.js: Create `app/jobs/[id]/edit/page.tsx`, fetch job data, pass to form
- Nuxt: Create `app/pages/jobs/[id]/edit.vue`, use `useRoute()` to get ID

**Learning:** Nested dynamic routes and data pre-population.

---

## 🎓 Final Thoughts

Neither framework is "better" - they make different tradeoffs:

| Aspect | Next.js | Nuxt |
|--------|---------|------|
| **Learning Curve** | Steeper (RSC concepts) | Gentler (Vue familiarity) |
| **Bundle Size** | Smaller (explicit client) | Larger (universal) |
| **DX** | More explicit | More magical |
| **Ecosystem** | React (massive) | Vue (growing) |

**Choose Next.js if:** You want maximum control over what ships to the client, or your team knows React.

**Choose Nuxt if:** You prefer Vue's reactivity model, or want faster prototyping with less boilerplate.

---

## 📚 Further Reading

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [React Server Components Explained](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Vue Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

---

*Happy coding! 🚀*
