<script setup>
import { toRefs, ref, defineProps } from 'vue';
import { useRoute } from 'vue-router';
// const route = useRoute();

// console.log(route.params.productArray)

const props = defineProps({
productArray: {
   type: Array,
   required: true,
   default: () => []
}
})


const {productArray} = toRefs(props);
console.log('receive props',productArray)

let quantity = ref(1);
const increment = () => {
   quantity.value++;
}
const decrement = () => {
   if (quantity.value > 1) {
      quantity.value--;
   }
}


</script>

<template>
   <section  class="flex justify-center">
      <div
         class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
         <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src="/src/assets/images/apple.jpg" alt="">
         <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology
               acquisitions 2021</h5>
         </div>
         <div class="flex">
            <button @click="decrement" class="bg-white-700 px-5 text-xl">-</button>
            <p class="text-xl">{{ quantity }}</p>
            <button @click="increment" class="bg-white-700 px-5 text-xl">+</button>
         </div>
         <div>
            <span class="material-icons cursor-pointer mt-2 me-4">delete</span>
         </div>
      </div>
   </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');
</style>