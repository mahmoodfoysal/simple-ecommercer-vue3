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

specificProductInfo.value = products;


const routeParamsId = ref(Number(route.params.id));

const filterProducts = () => {
  filteredProducts.value = specificProductInfo.value.filter(product => product.sub_category === routeParamsId.value);
};

watch(() => route.params.id, () => {
  routeParamsId.value = Number(route.params.id);
  filterProducts();
});


onMounted(() => {
  specificProductInfo.value = products;
  filterProducts();
});

const emits = defineEmits();

const handleAddToCart = product => {
  emits('handle-add-to-cart', product);
}

</script>

<template>
<!-- <h1>Specific Product load here {{ route.params.id }}</h1> -->
<p class="mt-5 mb-3">Home > Sub Category > {{ route.params.slug.replaceAll('-', ' ') }}</p>
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
.card-image {
    width: 100%;
    height: 280px;
}
</style>