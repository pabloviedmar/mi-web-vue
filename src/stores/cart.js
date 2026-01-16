import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  // Load from localStorage
  const storedItems = localStorage.getItem('cart_items');
  if (storedItems) {
    try {
      items.value = JSON.parse(storedItems);
    } catch (e) {
      console.error('Failed to parse cart items from localStorage', e);
    }
  }

  // Watch for changes and save to localStorage
  watch(items, (newItems) => {
    localStorage.setItem('cart_items', JSON.stringify(newItems));
  }, { deep: true });

  // Listen for storage events to sync across tabs
  window.addEventListener('storage', (event) => {
    if (event.key === 'cart_items') {
      try {
        const newItems = event.newValue ? JSON.parse(event.newValue) : [];
        // Only update if the data is different to avoid unnecessary reactivity triggers
        // simpler approach: just update it, Vue handles diffing
        items.value = newItems;
      } catch (e) {
        console.error('Failed to parse synced cart items', e);
      }
    }
  });

  const addToCart = (product) => {
    const existingItem = items.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    const index = items.value.findIndex((item) => item.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      }
    }
  };

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  };
});
