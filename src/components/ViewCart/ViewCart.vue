<script setup>
import { toRefs, ref, defineProps } from 'vue';

const props = defineProps({
   cartItems: {
      type: Array,
      default: () => ([]),
   }
});

const { cartItems } = toRefs(props);
console.log('receive props', cartItems.value)

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
   <section class="flex justify-center">
      <div>
         <div v-for="(cartItem, index) in cartItems" :key="index"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3">
            <img class="cart-image object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
               :src="cartItem?.pro_image" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
               <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {{ cartItem?.pro_name }}
               </h5>
            </div>
            <div class="flex">
               <button @click="decrement" class="bg-white-700 px-5 text-xl">-</button>
               <p class="text-xl">{{ quantity }}</p>
               <button @click="increment" class="bg-white-700 px-5 text-xl">+</button>
            </div>
            <div>
               <span class="text-md">{{ cartItem?.price }} Taka</span>
            </div>
            <div>
               <span class="material-icons cursor-pointer mt-2 me-4">delete</span>
            </div>
         </div>
      </div>
   </section>
   <div>
   </div>

   <!-- calculation section  -->
   <section class="calculation-section">
      <table style="width:100%">
         <tr>
            <td style="text-align: right; width:25%"></td>
            <td style="text-align: left; width:50%">Subtotal</td>
            <td style="text-align: left; width:25%">data</td>
         </tr>
         <tr>
            <td style="text-align: left; width:25%"></td>
            <td style="text-align: left; width:50%">(+) VAT</td>
            <td style="text-align: left; width:25%">data</td>
         </tr>
         <tr>
            <td style="text-align: left; width:25%"></td>
            <td style="text-align: left; width:50%">Delivery Fee</td>
            <td style="text-align: left; width:25%">data</td>
         </tr>
         <tr>
            <td style="text-align: left; width:25%"></td>
            <td style="text-align: left; width:50%">(-) Less discount on TP (3%)</td>
            <td style="text-align: left; width:25%">data</td>
         </tr>
      </table>
   </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Heebo&display=swap');

.cart-image {
   height: 100px;
   width: 150px;
}

.calculation-section {
   border-top: 1px solid black;
}
</style>