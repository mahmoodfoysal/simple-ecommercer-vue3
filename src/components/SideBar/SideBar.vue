<script setup>
import categories from '/data/category.json';
import { ref } from 'vue'

// declare ref for reactivation 
const categoryInfo = ref(null);

// reactive categories array 
categoryInfo.value = categories;

</script>

<template>
  <!-- side bar loop  -->
  <section>
    <h3 class="text-xl font-bold mb-2 ms-2">Categories</h3>
    <div id="accordion-collapse" data-accordion="collapse">
      <div class="p-2px" v-for="(category, cIndex) in categoryInfo" :key="cIndex">
        <h2 :id="`accordion-collapse-heading-${cIndex}`">
          <router-link 
          :to="{ name: 'ParentCategoryProducts', params: { id: category?.parent_cat_id, slug: category?.parent_cat_name.replace(/\s+/g, '-')} }">
          <button type="button"
            class="flex items-center justify-between w-full p-2 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            :data-accordion-target="`#accordion-collapse-body-${cIndex}`" aria-expanded="false"
            :aria-controls="`accordion-collapse-body-${cIndex}`">
            <span>
                {{ category?.parent_cat_name }}
            </span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </router-link>
        </h2>
        <div :id="`accordion-collapse-body-${cIndex}`" class="hidden"
          :aria-labelledby="`accordion-collapse-heading-${cIndex}`">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
              <h6 class="cursor-pointer font-medium mb-2" v-for="(subCategory, sIndex) in category?.parent_cat_sub_info"
                :key="sIndex">
                <router-link :to="{ name: 'SubCategoryProducts', params: { id: subCategory?.sub_cat_id, slug: subCategory?.sub_cat_name.replace(/\s+/g, '-')} }">
                  {{ subCategory?.sub_cat_name }}
                </router-link>
              </h6>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* .sidebar-style {
    border-right: 1px solid #d1d1d1;
    height: calc(100vh - 77px);
} */
</style>