<script setup>
import { defineProps, defineEmits, toRefs, computed } from 'vue';
const props = defineProps({
    cartItems: {
        type: Array,
        default: () => []
    }
});

const { cartItems } = toRefs(props);

// declare emits for data pass to the parent 
const emits = defineEmits([
    'cart-product-quantity-increment',
    'cart-product-quantity-decrement', 
    'handle-remove-item'
]);

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

</script>

<template>
    <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-4">
        <div class="sm:col-span-12 md:col-span-6 lg:col-span-6">
            <h1 class="text-3xl mt-3 mb-5">Contact Information</h1>
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                            name</label>
                        <input type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required>
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                            name</label>
                        <input type="text" id="last_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe" required>
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                            number</label>
                        <input type="tel" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City
                        </label>
                        <input type="text" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
                    </div>
                    <div>
                        <label for="phone"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                        <input type="text" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal
                            Code</label>
                        <input type="number" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
                    </div>
                    <div>
                        <label for="phone"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                        <input type="text" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                            Address</label>
                        <input type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                        address</label>
                    <input type="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com" required>
                </div>
                <h6 class="border-t-2 mb-5"></h6>
                <h4 class="text-xl mb-5">Delivary Method</h4>
                <h6 class="border-t-2 mb-5"></h6>
                <h4 class="text-xl mb-5">Payment</h4>
                <div class="mb-6">
                    <label for="card-no" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card
                        Number</label>
                    <input type="text" id="card-no"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com" required>
                </div>
                <div class="mb-6">
                    <label for="card-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name on
                        Card</label>
                    <input type="text" id="card-name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com" required>
                </div>

                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expeir
                            Date</label>
                        <input type="date" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required>
                    </div>
                    <div>
                        <label for="first_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVC</label>
                        <input type="number" id="first_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John" required>
                    </div>
                </div>


                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm
                    Order</button>
            </form>
        </div>
        <div class="sm:col-span-12 md:col-span-6 lg:col-span-6">
            <h1 class="text-3xl mb-5 mt-3">Order Summery</h1>
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
</style>