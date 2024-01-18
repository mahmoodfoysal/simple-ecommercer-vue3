<script setup>
import SideBar from './components/SideBar/SideBar.vue';
import NavigationBar from './components/Shared/NavigationBar/NavigationBar.vue';
import Footer from './components/Shared/Footer/Footer.vue';
// import Home from './components/Home/Home.vue';
import { ref } from 'vue';

// declare all ref for reactivation 
const receiveProductInfo = ref(null)
const cart = ref([]);
const pro_id = ref('');
const pro_image = ref('');
const pro_name = ref('');
const price = ref('');
const quantity = ref(1);

// console.log(cart)

// event handler for adding product to the cart 
const handleAddToCart = product => {
  receiveProductInfo.value = product;
  const isProductInCart = cart.value.find(cartItem => cartItem.pro_id === product.pro_id);
  if (!isProductInCart) {
    cart.value.push({
      pro_id: product.pro_id,
      pro_image: product.pro_image,
      pro_name: product.pro_name,
      price: product.price,
      quantity: quantity.value,
    });
    // console.log("Product Added to Cart");
  } 
  else if(isProductInCart) {
      const index = cart.value.indexOf(isProductInCart);
      if(index !== -1) {
        cart.value[index].quantity++;
        // console.log("Product with the same pro_id already exists in the Cart");
      }
  }
}

// event handler for increment cart product quantity
const handleIncrementCartQuantity = (proID) => {
  const isProductInCart = cart.value.find(cartItem => cartItem.pro_id === proID);
  if(isProductInCart) {
    const index = cart.value.indexOf(isProductInCart);
    if(index !== -1) {
      // console.log("increment found"); 
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
      // console.log("Decrement found"); 
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

</script>
<template>
  <!-- navbar  -->
  <NavigationBar 
  :cartItems="cart"
  ></NavigationBar>
  <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-3 mt-2">
    <div class="sm:col-span-12 md:col-span-6 lg:col-span-3">
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
      ></router-view>
      <!-- <home @handle-add-to-cart="handleAddToCart" :cartItem="cart"></home> -->
    </div>
  </div>
  <Footer></Footer>
</template>
<style scoped></style>
