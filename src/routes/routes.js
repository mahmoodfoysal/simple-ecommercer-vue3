import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '/src/components/NotFound/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home', 
        component: () => import('@/components/HomePageView/HomePageView.vue'),
    },
    {
        path: '/products',
        name: 'Products', 
        component: () => import('@/components/Products/Products.vue'),
        props: true
    },
    {
        path: '/categorys/:id/:slug',
        name: 'ParentCategoryProducts', 
        component: () => import('@/components/CategoryWiseProducts/ParentCategoryProducts.vue'),
    },
    {
        path: '/category/:id/:slug',
        name: 'SubCategoryProducts', 
        component: () => import('@/components/CategoryWiseProducts/SubCategoryProducts.vue'),
    },
    {
        path: '/contact', 
        name: 'Contact', 
        component: () => import('@/components/Contact/Contact.vue')
    },
    {
        path: '/about', 
        name: 'AboutUs', 
        component: () => import('@/components/AboutUs/AboutUs.vue')
    },
    {
        path: '/faq', 
        name: 'FAQ', 
        component: () => import('/src/components/FAQ/FAQ.vue')
    },
    {
        path: '/product-details/:id/:slug',
        name: "ProductDetails",
        component: () => import('@/components/ProductCard/ProductDetail.vue'),
    },
    {
        path: '/cart',
        name: "Cart",
        component: () => import('@/components/ViewCart/ViewCart.vue'),
        props: (route) => ({ productArray: route.params.productArray }),
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'PageNotFound', 
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active-link'
})

export default router;