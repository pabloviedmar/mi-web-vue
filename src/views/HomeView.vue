<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { ProductService } from '../services/ProductService';

const featuredProducts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const products = await ProductService.getProducts();
    featuredProducts.value = products.slice(0, 4);
  } catch (error) {
    console.error('Failed to load featured products:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 py-20 px-4 mb-12 border-b border-white/10">
      <div class="container mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
          Upgrade Your <span class="text-neon-green">Game</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The ultimate destination for high-performance PC hardware.
          Build your dream machine with the latest components.
        </p>
        <RouterLink
          to="/catalog"
          class="inline-block bg-neon-purple text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-600 transition-colors shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_30px_rgba(176,38,255,0.6)]"
        >
          Shop Now
        </RouterLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto px-4 pb-12">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold border-l-4 border-neon-green pl-4">Featured Products</h2>
        <RouterLink to="/catalog" class="text-neon-purple hover:text-white transition-colors">View All &rarr;</RouterLink>
      </div>

      <div v-if="loading" class="text-center py-20 text-gray-400">
        Loading featured products...
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>
