import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/homelayout/HomeLayout.vue';
import store from '../store';

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  if (store.getters.isLogin) {
    console.log('in if');
    next();
  } else {
    console.log('in else');
    next('/login'); // go to '/login';
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        beforeEnter: guardMyroute,
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/home/Home'),
      },
      // {
      //   path: '/login',
      //   name: 'Login',
      //   component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login'),
      // },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import(/* webpackChunkName: "about" */ '../views/auth/Signup'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login'),
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
