<script setup>
import HomeSlider from '../HomePages/HomeSlider.vue';
import Products from '../Products/Products.vue';
import { defineProps ,defineEmits } from 'vue';

// define props 
    const props = defineProps({
   cartItems: {
      type: Array,
      default: () => [],
   }
})

// declare emit are here 
const emits = defineEmits(['handle-add-to-cart', 'cart-product-quantity-increment','cart-product-quantity-decrement','handle-remove-item']);

// event handler pass for add to cart 
const handleAddToCart = product => {
    emits('handle-add-to-cart', product);
}

</script>

<template>
    <HomeSlider></HomeSlider>
    <Products 
    @handle-add-to-cart="handleAddToCart"
    ></Products>
</template>

<style scoped>

</style>