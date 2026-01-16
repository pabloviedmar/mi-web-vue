<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ShoppingCart, ArrowLeft } from 'lucide-vue-next';
import { ProductService } from '../services/ProductService';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const cartStore = useCartStore();
const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const id = route.params.id;
    product.value = await ProductService.getProductById(id);
  } catch (err) {
    error.value = 'Product not found';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <RouterLink to="/catalog" class="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green mb-8 transition-colors">
      <ArrowLeft class="w-4 h-4" /> Back to Catalog
    </RouterLink>

    <div v-if="loading" class="text-center py-20 text-gray-400">
      Loading product details...
    </div>

    <div v-else-if="error" class="text-center py-20 text-red-500">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Image -->
      <div class="rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <!-- Info -->
      <div class="flex flex-col justify-center">
        <div class="mb-4">
          <span class="inline-block bg-neon-purple/20 text-neon-purple border border-neon-purple/50 px-3 py-1 rounded text-sm font-mono mb-2">
            {{ product.category }}
          </span>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{{ product.name }}</h1>
          <p class="text-gray-300 text-lg leading-relaxed">{{ product.description }}</p>
        </div>

        <div class="flex items-center justify-between mt-8 p-6 bg-card-bg border border-white/10 rounded-xl">
          <span class="text-3xl font-bold text-white">${{ product.price }}</span>

          <button
            @click="addToCart"
            class="bg-neon-green text-black font-bold px-8 py-4 rounded-lg hover:bg-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] flex items-center gap-2 active:scale-95"
          >
            <ShoppingCart class="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
