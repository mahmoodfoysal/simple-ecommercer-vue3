<script setup>
import products from '/data/allProducts.json';
import ProductCard from '../ProductCard/ProductCard.vue';
import { ref, onMounted, watch, defineEmits } from 'vue';
// import use route from vue-router 
import { useRoute } from 'vue-router';

// initilize route 
const route = useRoute();

// declare ref 
const specificProductInfo = ref(null);
const filteredProducts = ref([]);

// reactive products array 
specificProductInfo.value = products;

// reactive id from the params 
const routeParamsId = ref(Number(route.params.id));

const filterProducts = () => {
  filteredProducts.value = specificProductInfo.value.filter(product => product.parent_category === routeParamsId.value);
};

// id change real time data finding 
watch(() => route.params.id, () => {
  routeParamsId.value = Number(route.params.id);
  filterProducts();
});

// loading json file on mount for real time change 
onMounted(() => {
  specificProductInfo.value = products;
  filterProducts();
});

// define emits here 
const emits = defineEmits(['handle-add-to-cart']);

// event handler for add to cart 
const handleAddToCart = product => {
  emits('handle-add-to-cart', product);
}

</script>

<template>
<p class="mt-5 mb-3">Home > Category > {{ route.params.slug.replaceAll('-', ' ') }}</p>
<h1 class="text-3xl text-center tracking-wide text-lime-500 font-bold mt-5 mb-5">Products</h1>
<div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-3 mt-2">
        <div 
        v-for="product in filteredProducts" 
        class="sm:col-span-12 md:col-span-6 lg:col-span-4">
        <ProductCard
        :product="product"
        @handle-add-to-cart="handleAddToCart" 
        ></ProductCard>
        </div>
    </div>
</template>

<style scoped>

</style>