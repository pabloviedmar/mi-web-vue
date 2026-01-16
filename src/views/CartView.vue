<script setup>
import { Trash2, Plus, Minus } from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';
import { RouterLink } from 'vue-router';

const cartStore = useCartStore();

const checkout = () => {
  if (cartStore.items.length === 0) return;
  alert(`Checkout complete! Total: $${cartStore.totalPrice.toFixed(2)}`);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-20 bg-card-bg rounded-lg border border-white/5">
      <p class="text-2xl text-gray-400 mb-6">Your cart is empty</p>
      <RouterLink
        to="/catalog"
        class="inline-block bg-neon-purple text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
      >
        Browse Catalog
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="bg-card-bg rounded-lg p-4 flex gap-4 items-center border border-white/5"
        >
          <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded bg-gray-800" />

          <div class="flex-grow">
            <h3 class="font-bold text-lg">{{ item.name }}</h3>
            <p class="text-neon-green font-mono">${{ item.price }}</p>
          </div>

          <div class="flex items-center gap-3 bg-dark-bg p-2 rounded-lg border border-white/10">
            <button
              @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
              class="w-8 h-8 flex items-center justify-center hover:text-neon-purple transition-colors"
            >
              <Minus class="w-4 h-4" />
            </button>
            <span class="w-8 text-center font-bold">{{ item.quantity }}</span>
            <button
              @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
              class="w-8 h-8 flex items-center justify-center hover:text-neon-purple transition-colors"
            >
              <Plus class="w-4 h-4" />
            </button>
          </div>

          <button
            @click="cartStore.removeFromCart(item.id)"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove item"
          >
            <Trash2 class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="bg-card-bg rounded-lg p-6 border border-white/5 h-fit sticky top-24">
        <h2 class="text-2xl font-bold mb-6">Order Summary</h2>

        <div class="space-y-4 mb-6 text-gray-300">
          <div class="flex justify-between">
            <span>Items ({{ cartStore.totalItems }})</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping</span>
            <span class="text-neon-green">Free</span>
          </div>
          <div class="border-t border-white/10 pt-4 flex justify-between font-bold text-xl text-white">
            <span>Total</span>
            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="checkout"
          class="w-full bg-neon-green text-black font-bold py-4 rounded-lg hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)]"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
