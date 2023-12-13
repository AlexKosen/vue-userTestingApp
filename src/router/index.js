import { createRouter, createWebHistory } from 'vue-router';
import TestList from '../components/Test/testList.vue';
import Login from '../components/login.vue';
import Register from '../components/register.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: TestList },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
