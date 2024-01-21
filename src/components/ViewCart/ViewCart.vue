<script setup>
import { toRefs, defineProps, computed, defineEmits } from 'vue';

// receive props 
const props = defineProps({
   cartItems: {
      type: Array,
      default: () => [],
   }
});

// reactive cart props props 
const { cartItems } = toRefs(props);

// define emits for data pass to the parent
const emits = defineEmits([
   'handle-add-to-cart',
   'cart-product-quantity-increment',
   'cart-product-quantity-decrement',
   'handle-remove-item',
   'handle-checkout-info'
]);

// quantity increment event handler sent to the parent
const increment = (proID) => {
   emits('cart-product-quantity-increment', proID);
}

// quantity decrement event handler sent to the parent
const decrement = (proID) => {
   emits('cart-product-quantity-decrement', proID)
}

// declare all computed property for cart calculation

// calculate the sub total 
let subTotal = computed(() => {
   const totalQuantityWithPrice = cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
   }, 0);
   return totalQuantityWithPrice;
});

// calculate total vat amount 
let totalVat = computed(() => {
   return subTotal.value * 0.15;
})

// delevary fee amount calculate and using condition
let delevaryFee = computed(() => {
   if (cartQuantity.value <= 4) {
      return 100;
   }
   else if (cartQuantity.value > 10) {
      return 20;
   }
   else {
      return 60;
   }
});

// show total product quantity in the cart
let cartQuantity = computed(() => {
   const totalProduct = cartItems.value.reduce((total, item) => {
      return total + item.quantity;
   }, 0);
   return totalProduct;
});

// total amount calculate
let totalAmount = computed(() => {
   return subTotal.value + totalVat.value + delevaryFee.value;
})

// remove items from the cart 
const handleRemoveItem = (item) => {
   emits('handle-remove-item', item);
};

</script>
<template>
   <h2 class="text-3xl mt-2 mb-2 border-b-2">Cart Items</h2>
   <section class="flex justify-center fix-height">
      <div>
         <div v-for="(cartItem, index) in cartItems" :key="index"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3">
            <img class="cart-image object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
               :src="cartItem?.pro_image" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
               <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {{ cartItem?.pro_name }}
               </h5>
            </div>
            <div class="flex">
               <button @click="decrement(cartItem?.pro_id)"
                  class="bg-white-700 px-5 text-xl hover:text-blue-800">-</button>
               <p class="text-xl">{{ cartItem?.quantity }}</p>
               <button @click="increment(cartItem?.pro_id)"
                  class="bg-white-700 px-5 text-xl hover:text-blue-800">+</button>
            </div>
            <div>
               <span class="text-md">$ {{ (cartItem?.price * cartItem.quantity) }}</span>
            </div>
            <div>
               <span @click="handleRemoveItem(cartItem?.pro_id)"
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
      <router-link :to="{ name: 'Checkout', params: { slug: 'Check-out' } }">
         <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Check
            Out</button>
      </router-link>
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

.fix-height {
   height: calc(100vh - 320px);
   overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
      width: 8px;
      border-radius: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
</style>