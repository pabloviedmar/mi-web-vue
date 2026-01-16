import products from '../data/products.json';

export const ProductService = {
  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 500); // Simulate network delay
    });
  },

  getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find((p) => p.id === Number(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 500);
    });
  }
};
