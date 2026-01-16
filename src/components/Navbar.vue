<script setup>
import { ShoppingCart, User, LogOut } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();
</script>

<template>
  <nav class="bg-card-bg border-b border-white/10 p-4 sticky top-0 z-50 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold text-neon-green tracking-tighter flex items-center gap-2">
        <span class="text-3xl">&lt;/&gt;</span> TechComponentes
      </RouterLink>

      <div class="flex items-center gap-6 font-medium">
        <RouterLink to="/" class="hover:text-neon-purple transition-colors">Home</RouterLink>
        <RouterLink to="/catalog" class="hover:text-neon-purple transition-colors">Catalog</RouterLink>

        <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
          <span class="text-gray-300 flex items-center gap-2">
            <User class="w-4 h-4 text-neon-purple" />
            {{ authStore.user.name }}
          </span>
          <button @click="authStore.logout" class="text-gray-400 hover:text-white transition-colors" title="Logout">
            <LogOut class="w-5 h-5" />
          </button>
        </div>
        <RouterLink v-else to="/login" class="hover:text-neon-purple transition-colors">Login</RouterLink>

        <RouterLink to="/cart" class="relative group">
          <ShoppingCart class="w-6 h-6 group-hover:text-neon-green transition-colors" />
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-2 -right-2 bg-neon-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
          >
            {{ cartStore.totalItems }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
