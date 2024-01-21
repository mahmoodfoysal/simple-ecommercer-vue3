<script setup>
// load json data from the json file 
import products from '/data/allProducts.json';
import ProductCard from '../ProductCard/ProductCard.vue';
import { ref, defineEmits, computed } from 'vue';

// declare all ref are here for reactivation 
const productsInfo = ref(null);

// reactive the json data 
productsInfo.value = products;

// declare emit for using emit 
const emits = defineEmits(['handle-add-to-cart']);

// event handler for pass the data to the parent 
const handleAddToCart = product => {
  emits('handle-add-to-cart', product);
}

// pagination work are here 

// decalare a variable for how much product show at a time 
const itemsPerPage = 8;

// reactivation page variable 
const page = ref(1);

// finding how much product in the array and division by 8
const totalPages = computed(() => Math.ceil(productsInfo.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return productsInfo.value.slice(startIndex, endIndex);
});

// button control by clicking 
const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
  }
};

</script>

<template>
    <h1 class="text-3xl text-center tracking-wide text-lime-500 font-bold mt-5 mb-5">Products</h1>
    <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-3 mt-2">
        <div 
        v-for="product in paginatedProducts" 
        class="sm:col-span-12 md:col-span-6 lg:col-span-4">

        <ProductCard
        :product="product"
        @handle-add-to-cart="handleAddToCart" 
       ></ProductCard>
        </div>
    </div>
    <!-- pagination  -->
    <div class="flex justify-center mt-5">
  <!-- Previous Button -->
  <button 
  @click="goToPage(page - 1)" :disabled="page === 1"
  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Previous
  </button>
  <!-- <span class="ms-3" >{{ page }}</span> -->
  <button 
  @click="goToPage(1)" :disabled="page === 1"
  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ms-2">
    1
  </button>
  <button 
  @click="goToPage(2)" :disabled="page === 2"
  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ms-2">
    2
  </button>
  <button 
  @click="goToPage(3)" :disabled="page === 3"
  class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ms-2">
    3
  </button>

  <button 
  @click="goToPage(page + 1)" :disabled="page === totalPages"
  class="flex items-center justify-center px-3 h-8 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Next
  </button>
</div>


<!-- testing  -->

</template>

<style scoped>
.card-image {
    width: 100%;
    height: 280px;
}
</style>