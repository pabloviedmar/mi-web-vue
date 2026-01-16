<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/AuthService';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const fullName = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref(null);
const loading = ref(false);

const handleRegister = async () => {
  error.value = null;

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }

  loading.value = true;
  try {
    const user = await AuthService.register({
      full_name: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value
    });

    // Auto-login after registration logic can be here,
    // or redirect to login. Let's auto-login as per "when entering LoginView he can have access" implies persistence,
    // but typically user expectation is auto-login or redirect to login.
    // The prompt says "when create that account the data be saved, so when into LoginView he can have access".
    // This implies we should probably redirect to LoginView or just let them login.
    // But for better UX, I'll log them in.
    // However, if I log them in, I should push to Home.
    // If I redirect to Login, they can type it in.
    // "create account... skip to another view... form... when create that account... saved... so when enter login view he can have access".
    // This implies the action of creating saves it for *future* login.
    // I will log them in immediately for convenience, but the prompt requirement is satisfied by the Backend DB storage.

    authStore.login(user);
    router.push('/');
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleGoogleLogin = () => {
  // Logic to handle Google Auth would go here (e.g., Firebase or OAuth redirect)
  alert("Google Login requires OAuth configuration.");
};
</script>

<template>
  <div class="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
    <div class="bg-card-bg border border-white/10 p-8 rounded-xl shadow-2xl w-full max-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-white">Create Account</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-gray-300 mb-2">Full Name</label>
          <input
            v-model="fullName"
            type="text"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="johndoe"
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label class="block text-gray-300 mb-2">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-neon-purple focus:outline-none transition-colors text-white"
            placeholder="Confirm your password"
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
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>

        <div class="relative flex py-2 items-center">
            <div class="flex-grow border-t border-gray-600"></div>
            <span class="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div class="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          type="button"
          @click="handleGoogleLogin"
          class="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <!-- Simple Google Icon SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
          Sign up with Google
        </button>

      </form>

       <div class="mt-4 text-center">
          <p class="text-gray-400">Already have an account? <router-link to="/login" class="text-neon-purple hover:underline">Login here</router-link></p>
        </div>
    </div>
  </div>
</template>
