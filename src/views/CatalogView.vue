<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { ProductService } from '../services/ProductService';

const products = ref([]);
const loading = ref(true);
const selectedCategory = ref('All');

const categories = computed(() => {
  if (products.value.length === 0) return ['All'];
  return ['All', ...new Set(products.value.map(p => p.category))];
});

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return products.value;
  }
  return products.value.filter(p => p.category === selectedCategory.value);
});

onMounted(async () => {
  try {
    products.value = await ProductService.getProducts();
  } catch (error) {
    console.error('Failed to load products:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Catalog</h1>

    <div v-if="loading" class="text-center py-20 text-gray-400">
      Loading products...
    </div>

    <div v-else>
      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full border transition-all duration-300"
          :class="selectedCategory === category
            ? 'bg-neon-purple border-neon-purple text-white shadow-[0_0_10px_rgba(176,38,255,0.4)]'
            : 'bg-card-bg border-white/10 hover:border-neon-purple text-gray-300'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center py-20 text-gray-400">
        No products found in this category.
      </div>
    </div>
  </div>
</template>
