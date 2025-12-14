<!--
  THEORY: Nuxt Layout System
  
  Layouts in Nuxt wrap page components and persist during navigation (similar to Next.js).
  The key difference is that Nuxt uses Vue's <slot /> mechanism instead of React's children prop.
  
  <slot /> is Vue's content projection API:
  - It renders whatever content the parent (in this case, the page) passes to it
  - Similar to {children} in React, but more powerful (supports named slots, scoped slots, etc.)
  
  <NuxtLink> is Nuxt's smart navigation component:
  - Enables CLIENT-SIDE navigation (no full page reload)
  - AUTOMATICALLY pre-fetches linked pages when the link enters the viewport
  - This "viewport prefetching" is more aggressive than Next.js's hover-based prefetch
  - Uses the native <a> tag under the hood for SEO and accessibility
-->

<script setup lang="ts">
// No imports needed - NuxtLink is auto-imported by Nuxt!
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="text-lg font-bold text-emerald-700">
          JobHunt Tracker
        </NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/add"
            class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            + Add Job
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Page Content (injected via <slot />) -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-200 bg-zinc-50 py-6">
      <div class="mx-auto max-w-5xl px-6 text-center text-sm text-zinc-500">
        © {{ new Date().getFullYear() }} JobHunt Tracker. Built with Nuxt 3 (Composition API).
      </div>
    </footer>
  </div>
</template>
