import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../views/Home.vue');
const Character = () => import('../views/Character.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/character/:id',
    name: 'Character',
    component: Character,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
