<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <footer class="bg-card-bg border-t border-white/10 py-8 text-center text-gray-500 text-sm">
      <p>&copy; 2024 TechComponentes. Built for Gamers.</p>
    </footer>
  </div>
</template>
