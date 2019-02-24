import Vue from 'vue';
import Router from 'vue-router';
import { Auth } from 'aws-amplify';
import Home from './views/Home.vue';
import Quotes from './views/Quotes.vue';
import About from './views/About.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/quotes',
      name: 'quotes',
      component: Quotes,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeResolve((to, from, next) => {
  // if route requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check for authenticated user.
    Auth.currentAuthenticatedUser().then((data) => {
      // if user is authenticated, continue.
      if (data && data.signInUserSession) {
        next();
      // not authenticated. redirect to main.
      } else {
        next({ path: '/' });
      }
    }).catch((e) => {
      console.log(e);
      next({ path: '/' });
    });
  // auth not required. continue.
  } else {
    next();
  }
});


export default router;
