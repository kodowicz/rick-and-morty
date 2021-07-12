import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/Home.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
