<script setup>
import { toRefs, ref, defineProps, computed } from 'vue'

// receive props from the parent component 
const props = defineProps({
    cartItems: {
        type: Array,
        default: () => ([]),
    },
});

// reactive props 
let { cartItems } = toRefs(props);

// declare all ref for reactivation 
let cartItemArray = ref(cartItems.value);

// calculate the total product sub amount 
let total = computed(() => {
    const totalQuantityWithPrice = cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
   }, 0);
   return totalQuantityWithPrice;
});

// calculate the total product quantity 
const cartQuantity = computed(() => {
    const totalProduct = cartItems.value.reduce((total, item) => {
      return total + item.quantity;
   }, 0);
   return totalProduct;
}) 

</script>

<template>
    <div class="navbar bg-base-200 sticky top-0 z-50">
        <div class="flex-1">
            <router-link to="/">
                <a class="btn btn-ghost text-xl">NavBar</a>
            </router-link>
        </div>
        
        <div class="flex-none">
            <!-- menu items start  -->
            <div class="flex">
                <router-link :to="{name: 'Home'}"><p class="me-5 cursor-pointer font-medium">Home</p></router-link>
                <router-link :to="{name: 'Products'}"><p class="me-5 cursor-pointer font-medium">Products</p></router-link>
                <router-link :to="{name: 'Contact'}"><p class="me-5 cursor-pointer font-medium">Contact</p></router-link>
                <router-link :to="{name: 'AboutUs'}"><p class="me-5 cursor-pointer font-medium">About</p></router-link>
                <router-link :to="{name: 'FAQ'}"><p class="me-5 cursor-pointer font-medium">FAQ</p></router-link>
            </div>
            
            <!-- menu item end  -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="badge badge-sm indicator-item">{{ cartQuantity }}</span>
                    </div>
                </div>
                <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div class="card-body">
                        <span class="font-bold text-lg">{{ cartQuantity }} Items</span>
                        <span class="text-info">Subtotal: $ {{total}}</span>
                        <div class="card-actions">
                            <router-link v-if="cartItemArray?.length > 0" :to="{ name: 'Cart'}">
                                <button class="btn btn-primary btn-block">View cart</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active-link {
    color: blue;
}
</style>