import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '/profile/:id',
    name: 'profile',
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/'); // TODO /login
  } else {
    next();
  }
});

export default router;
