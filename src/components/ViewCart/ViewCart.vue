<script setup>
import { toRefs, ref, defineProps, computed, defineEmits } from 'vue';

// receive props 
const props = defineProps({
   cartItems: {
      type: Array,
      default: () => ([]),
   }
});

// define emits 
const emits = defineEmits();

// reactive props 
const { cartItems } = toRefs(props);
// console.log('receive props', cartItems.value)

// declare quantity initial value 1 
let quantity = ref(1);

// quantity increment event handler 
const increment = () => {
   quantity.value++;
}

// quantity decrement event handler 
const decrement = () => {
   if (quantity.value > 1) {
      quantity.value--;
   }
} 

// declare all computed property 

// calculate the sub total 
let subTotal = computed(() => {
    return cartItems.value.reduce((initialVal, item) => {
        return initialVal + item.price;
    }, 0);
});

// calculate total vat amount 
let totalVat = computed(() => {
   return subTotal.value * 0.15;
})

// delevary fee conditions
let delevaryFee = computed(() => {
   if(cartItems.value.length <= 2) {
   return delevaryFee = 100;
}
else if(cartItems.value.length > 2) {
   return delevaryFee = 60;
}
else if(cartItems.value.length > 10) {
   return delevaryFee = 0;
}
});

// total amount calculate 
let totalAmount = computed(() => {
   return subTotal.value + totalVat.value + delevaryFee;
}) 

const handleRemoveItem = (item) => {
   emits('handle-remove-item', item);
};

const sameProduct = cartItems.value.filter(cartItem => cartItem.pro_id === cartItem.pro_id);
console.log("storeing same product", sameProduct)

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
               <span class="text-md">$ {{ cartItem?.price }}</span>
            </div>
            <div>
               <span 
               @click="handleRemoveItem(cartItem?.pro_id)"
               class="material-icons cursor-pointer mt-2 me-4 hover:text-red-800">delete</span>
            </div>
         </div>
      </div>
   </section>
   <div>
   </div>

   <!-- calculation section  -->
   <section class="calculation-section mt-3">
      <table class="mt-3" style="width:100%">
         <tr>
            <td style="text-align: right; width:25%"></td>
            <td style="text-align: left; width:50%">Subtotal</td>
            <td style="text-align: left; width:25%">$ {{ subTotal }}</td>
         </tr>
         <tr>
            <td style="text-align: left; width:25%"></td>
            <td style="text-align: left; width:50%">(+) VAT</td>
            <td style="text-align: left; width:25%">$ {{ totalVat }}</td>
         </tr>
         <tr>
            <td style="text-align: left; width:25%"></td>
            <td style="text-align: left; width:50%">Delivery Fee</td>
            <td style="text-align: left; width:25%">$ {{ delevaryFee }}</td>
         </tr>
         <tr>
            <td style="text-align: left; width:25%"></td>
            <td style="text-align: left; width:50%">Total Amount</td>
            <td style="text-align: left; width:25%">$ {{ totalAmount }}</td>
         </tr>
      </table>
      
   </section>
   <div class="flex justify-end mr-[17%] mt-5">
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Check Out</button>
   </div>
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