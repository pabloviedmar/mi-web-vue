<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/AuthService';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const handleLogin = async () => {
  error.value = null;
  loading.value = true;
  try {
    const user = await AuthService.login(username.value, password.value);
    authStore.login(user);
    router.push('/');
  } catch (err) {
    error.value = 'Invalid username or password';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
    <div class="bg-card-bg border border-white/10 p-8 rounded-xl shadow-2xl w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-gray-300 mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="Enter your password"
          />
        </div>

        <div v-if="error" class="text-red-500 text-center text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-neon-purple text-white font-bold py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>
