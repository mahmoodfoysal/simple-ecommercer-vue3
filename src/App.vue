<script setup>
import SideBar from './components/SideBar/SideBar.vue';
import NavigationBar from './components/Shared/NavigationBar/NavigationBar.vue';
import Footer from './components/Shared/Footer/Footer.vue';
import { ref } from 'vue';

// declare all ref for reactivation 
const cart = ref([]);
const pro_id = ref('');
const pro_image = ref('');
const pro_name = ref('');
const price = ref('');
const quantity = ref(1);

// check out information all ref declare here 

// this empty array store the data when user click check out 
const checkOut = ref([]);

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

// event handler for adding product to the cart 
const handleAddToCart = product => {
  const isProductInCart = cart.value.find(cartItem => cartItem.pro_id === product.pro_id);
  if (!isProductInCart) {
    cart.value.push({
      pro_id: product.pro_id,
      pro_image: product.pro_image,
      pro_name: product.pro_name,
      price: product.price,
      quantity: quantity.value,
    });
  } 
  else if(isProductInCart) {
      const index = cart.value.indexOf(isProductInCart);
      if(index !== -1) {
        cart.value[index].quantity++;
      }
  }
}

// event handler for increment cart product quantity
const handleIncrementCartQuantity = (proID) => {
  const isProductInCart = cart.value.find(cartItem => cartItem.pro_id === proID);
  if(isProductInCart) {
    const index = cart.value.indexOf(isProductInCart);
    if(index !== -1) {
      cart.value[index].quantity++;
    }
  }
}

// event handler for decrement cart product quantity 
const handleDecrementCartQuantity = (proID) => {
  const isProductInCart = cart.value.find(cartItem => cartItem.pro_id === proID);
  if(isProductInCart) {
    const index = cart.value.indexOf(isProductInCart);
    if(index !== -1) {
      if(cart.value[index].quantity > 1) {
        cart.value[index].quantity--;
      }
    }
  }
}

// remove item from the cart 
const handleRemoveItem = (item) => {
  const findTargetProduct = cart.value.find((cartItem) => cartItem.pro_id === item);
  if (findTargetProduct) {
    const index = cart.value.indexOf(findTargetProduct);
    if (index !== -1) {
      window.confirm('Are you sure want to delete!!!', cart.value.splice(index, 1));
      alert("Product Remove from your cart!!!");
    } 
  } 
}

// check out information and data store here 
const handleInformationForm = (checkOutInfo) => {
  checkOut.value = [
  checkOutInfo,
  ];
  cart.value = [];
}

console.log(checkOut);

</script>
<template>
  <!-- navbar  -->
  <NavigationBar 
  :cartItems="cart"
  ></NavigationBar>
  <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-3">
    <div class="sm:col-span-12 md:col-span-6 lg:col-span-3 sidebar-style">
      <!-- sidebar  -->
      <SideBar></SideBar>
    </div>
    <div class="sm:col-span-12 md:col-span-6 lg:col-span-9">
      <router-view 
      :cartItems="cart" 
      @handle-add-to-cart="handleAddToCart"
      @handle-remove-item="handleRemoveItem"
      @cart-product-quantity-increment="handleIncrementCartQuantity"
      @cart-product-quantity-decrement="handleDecrementCartQuantity"
      @handle-checkout-info="handleInformationForm"
      ></router-view>
    </div>
  </div>
  <Footer></Footer>
</template>
<style scoped>
.sidebar-style {
    border-right: 1px solid #d1d1d1;
}
</style>
