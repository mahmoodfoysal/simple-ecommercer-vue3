<script setup>
import HomeSlider from '../HomePages/HomeSlider.vue';
import Products from '../Products/Products.vue';
import { defineEmits } from 'vue';

const emits = defineEmits();

const handleAddToCart = product => {
    emits('handle-add-to-cart', product);
}

</script>

<template>
    <HomeSlider></HomeSlider>
    <Products 
    @handle-add-to-cart="handleAddToCart"></Products>
</template>

<style scoped>

</style>