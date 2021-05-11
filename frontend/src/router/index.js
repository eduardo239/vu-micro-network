import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   meta: {
  //     requireAuth: true,
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  // },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
