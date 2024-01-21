<script setup>
import { defineProps, defineEmits, toRefs, ref, computed } from 'vue';

// receive props from the parent component 
const props = defineProps({
    cartItems: {
        type: Array,
        default: () => []
    }
});

// reactive props 
const { cartItems } = toRefs(props);

// declare emits for data pass to the parent 
const emits = defineEmits([
    'handle-checkout-info',
    'cart-product-quantity-increment',
    'cart-product-quantity-decrement',
    'handle-remove-item'

]);

// declare all ref are here 
const firstName = ref('');
const lastName = ref('');
const phoneNo = ref(null);
const city = ref('');
const country = ref('');
const postalCode = ref(null);
const state = ref('');
const fullAddress = ref('');
const email = ref('');
const cardNo = ref(null);
const nameOfCard = ref('');
const cardExpireDate = ref('');
const cardCVC = ref(null);
const productInformation = ref('');

// event handler for product increment button 
const increment = (proID) => {
    emits('cart-product-quantity-increment', proID);
}

// event handler for product decrement button 
const decrement = (proID) => {
    emits('cart-product-quantity-decrement', proID);
}

// declare all computed properties are here 

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

// event handler for store checkout information 
const handleInformationForm = () => {
    console.log("click information form");
    const checkOutInfo = {
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNo: phoneNo.value,
        city: city.value,
        country: country.value,
        postalCode: postalCode.value,
        state: state.value,
        fullAddress: fullAddress.value,
        email: email.value,
        cardNo: cardNo.value,
        nameOfCard: nameOfCard.value,
        cardExpireDate: cardExpireDate.value,
        cardCVC: cardCVC.value,
        productInformation: cartItems.value
    }

    // data pass to the parent 
    emits('handle-checkout-info', checkOutInfo, cartItems)

        // after passing data input field are blank 
        firstName.value = '';
        lastName.value = '';
        phoneNo.value = '';
        city.value = '';
        country.value = '';
        postalCode.value = '';
        state.value = '';
        fullAddress.value = '';
        email.value = '';
        cardNo.value = '';
        nameOfCard.value = '';
        cardExpireDate.value = '';
        cardCVC.value = '';
}

</script>

<template>
    <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-4">
        <div class="sm:col-span-12 md:col-span-6 lg:col-span-6">
            <h1 class="text-3xl mt-3 mb-5">Contact Information</h1>
            <form @submit.prevent="handleInformationForm">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                            name</label>
                        <input v-model="firstName" type="text" id="first_name"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John">
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                            name</label>
                        <input v-model="lastName" type="text" id="last_name"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe">
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                            number</label>
                        <input v-model.number="phoneNo" type="number" id="phone"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Phone No">
                    </div>
                    <div>
                        <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City
                        </label>
                        <input v-model="city" type="text" id="city"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter City Name">
                    </div>
                    <div>
                        <label for="country"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                        <input v-model="country" type="text" id="country"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Country Name">
                    </div>
                    <div>
                        <label for="postal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal
                            Code</label>
                        <input v-model.number="postalCode" type="number" id="postal"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Postal Code">
                    </div>
                    <div>
                        <label for="state"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                        <input v-model="state" type="text" id="state"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter State Name">
                    </div>
                    <div>
                        <label for="full-address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                            Address</label>
                        <input v-model="fullAddress" type="text" id="full-address"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Full Address">
                    </div>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                        address</label>
                    <input v-model="email" type="email" id="email"
                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com">
                </div>
                <h6 class="border-t-2 mb-5"></h6>
                <h4 class="text-xl mb-5">Delivary Method</h4>
                <h6 class="border-t-2 mb-5"></h6>
                <h4 class="text-xl mb-5">Payment</h4>
                <div class="mb-6">
                    <label for="card-no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card
                        Number</label>
                    <input v-model.number="cardNo" type="text" id="card-no"
                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1111 1111 1111 1111">
                </div>
                <div class="mb-6">
                    <label for="card-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name on
                        Card</label>
                    <input v-model="nameOfCard" type="text" id="card-name"
                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John">
                </div>

                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="expire-date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expeir
                            Date</label>
                        <input v-model="cardExpireDate" type="date" id="expire-date"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John">
                    </div>
                    <div>
                        <label for="first_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVC</label>
                        <input v-model.number="cardCVC" type="number" id="first_name"
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="111">
                    </div>
                </div>


                
                    <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm
                    Order</button>
            </form>
        </div>
        <div class="sm:col-span-12 md:col-span-6 lg:col-span-6">
            <h1 class="text-3xl mb-5 mt-3">Order Summery</h1>
            <div class="fix-height">
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
                        <span class="text-md">$ {{ cartItem?.price }}</span>
                    </div>
                    <div>
                        <span @click="handleRemoveItem(cartItem?.pro_id)"
                            class="material-icons cursor-pointer mt-2 me-4 hover:text-red-800">delete</span>
                    </div>
                </div>
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

        </div>
    </div>
</template>

<style scoped>
.cart-image {
    height: 100px;
    width: 150px;
    object-fit: cover;
}

.calculation-section {
    border-top: 1px solid black;
}
.fix-height {
   height: calc(100vh - 285px);
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