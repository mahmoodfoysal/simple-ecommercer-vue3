<script setup>
import { toRefs, defineProps } from 'vue';
const props = defineProps({
    cartItem: {
        type: Array,
        default: () => ([]),
    }
});
const { cartItem } = toRefs(props);

</script>

<template>
    <router-view :cartItem="cartItem"></router-view>
</template>

<style scoped></style>