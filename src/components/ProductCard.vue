<script setup>
import { ShoppingCart } from 'lucide-vue-next';
import { useCartStore } from '../stores/cart';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addToCart(props.product);
};
</script>

<template>
  <div class="bg-card-bg rounded-lg overflow-hidden shadow-lg border border-white/5 hover:border-neon-purple/50 transition-all duration-300 flex flex-col h-full group">
    <div class="relative overflow-hidden aspect-video">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-mono text-neon-green border border-neon-green/30 backdrop-blur-sm">
        {{ product.category }}
      </div>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-bold mb-1 line-clamp-1 group-hover:text-neon-purple transition-colors" :title="product.name">{{ product.name }}</h3>
      <p class="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">{{ product.description }}</p>

      <div class="flex items-center justify-between mt-auto">
        <span class="text-xl font-bold text-white">${{ product.price }}</span>

        <button
          @click="addToCart"
          class="bg-neon-purple/10 hover:bg-neon-purple text-neon-purple hover:text-white border border-neon-purple rounded-lg px-3 py-2 transition-all duration-300 flex items-center gap-2 active:scale-95"
        >
          <ShoppingCart class="w-4 h-4" />
          <span class="text-sm font-bold">Add</span>
        </button>
      </div>
    </div>
  </div>
</template>
