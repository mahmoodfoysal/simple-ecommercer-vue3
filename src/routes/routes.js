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
    },
    {
        path: '/products/:id',
        name: 'ProductsSpecific', 
        component: () => import('@/components/SpecificProducts/SpecificProducts.vue'),
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