<script setup>
import SideBar from './components/SideBar/SideBar.vue';
import NavigationBar from './components/Shared/NavigationBar/NavigationBar.vue';
import Footer from './components/Shared/Footer/Footer.vue';
import Home from './components/Home/Home.vue';
import { ref, toRefs, reactive } from 'vue';

const receiveProductInfo = ref(null)

const handleAddToCart = product => {
  receiveProductInfo.value = product;
}

</script>

<template>
<!-- navbar  -->
<NavigationBar :productInfo="receiveProductInfo"></NavigationBar>
  <div class="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-3 mt-2">
    <div class="sm:col-span-12 md:col-span-6 lg:col-span-3">
      <!-- sidebar  -->
      <SideBar 
      ></SideBar>
    </div>
    <div class="sm:col-span-12 md:col-span-6 lg:col-span-9">
      <home
      @handle-add-to-cart="handleAddToCart"
      ></home>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped></style>
