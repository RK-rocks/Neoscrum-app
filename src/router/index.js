import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/homelayout/HomeLayout.vue';
import PageNotFound from '../components/helpers/PageNotFound'
// import PageNotFound from './'
import store from '../store';

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  // alert("here")
  console.log(to)
  console.log(localStorage.getItem('token'))
  if (localStorage.getItem('token')) {
    console.log('in if');
    next();
  } else {
    console.log('in else');
    next('/login'); // go to '/login';
  }
}

function loginGuard(to, from, next) {
  console.log(to)
  console.log(localStorage.getItem('token'))
  if (localStorage.getItem('token')) {
    console.log('in if');
    next('/');
  } else {
    next()
  }
}

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  beforeEnter: guardMyroute,
  children: [{
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/home/Home'),
  },
  {
    path: '/add-feedback',
    name: 'add-feedback',
    component: () => import( /* webpackChunkName: "about" */ '../views/home/AddFeedBack'),
  },
  ],
},
{
  path: '/login',
  name: 'Login',
  beforeEnter: loginGuard,
  component: () => import( /* webpackChunkName: "about" */ '../views/auth/Login'),
},
{
  path: '/signup',
  name: 'Signup',
  beforeEnter: loginGuard,
  component: () => import( /* webpackChunkName: "about" */ '../views/auth/Signup'),
},
{
  // catch all 404 - define at the very end
  path: "*",
  redirect: to => { return '/404' },
  // component: () => import("../components/helpers/PageNotFound")
},
{
  path: '/404',
  name: 'PageNotFound',
  // redirect: to => { import("../components/helpers/PageNotFound") },
  component: () => import("../components/helpers/PageNotFound")
}
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
