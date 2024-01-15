<script setup>
import HomeSlider from '../HomePages/HomeSlider.vue';
import Products from '../Products/Products.vue';

const emit = defineEmits();

const handleAddToCart = product => {
    emit('handle-add-to-cart', product);
}

</script>

<template>
    <HomeSlider></HomeSlider>
    <Products 
    @handle-add-to-cart="handleAddToCart"></Products>
</template>

<style scoped>

</style>