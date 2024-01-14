<script setup>
import products from '/data/allProducts.json';
import ProductCard from '../ProductCard/ProductCard.vue';
import { ref } from 'vue';
const productsInfo = ref(null);

productsInfo.value = products;
</script>

<template>
    <h1 class="text-3xl text-center tracking-wide text-lime-500 font-bold mt-5 mb-5">Products</h1>
    <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-3 mt-2">
        <div 
        v-for="product in productsInfo" 
        class="sm:col-span-12 md:col-span-6 lg:col-span-4">

        <ProductCard
        :product="product"
       ></ProductCard>
        </div>
    </div>
    <!-- pagination  -->
    <div class="flex justify-center mt-5">
  <!-- Previous Button -->
  <a href="#" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Previous
  </a>

  <!-- Next Button -->
  <a href="#" class="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Next
  </a>
</div>
</template>

<style scoped>
.card-image {
    width: 100%;
    height: 280px;
}
</style>