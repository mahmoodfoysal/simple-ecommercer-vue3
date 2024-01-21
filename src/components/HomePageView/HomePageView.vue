<script setup>
import HomeSlider from '../HomePages/HomeSlider.vue';
import Products from '../Products/Products.vue';
import { defineProps, defineEmits } from 'vue';

// receive props from the parent 
const props = defineProps({
    cartItems: {
        type: Array,
        default: () => [],
    }
})

// decalre emit for passing data to the parent
const emits = defineEmits([
    'handle-add-to-cart',
    'cart-product-quantity-increment',
    'cart-product-quantity-decrement',
    'handle-remove-item',
    'handle-checkout-info'
]);

// event handler pass to the parent
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

<style scoped></style>