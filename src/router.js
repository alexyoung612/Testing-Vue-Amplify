import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Quotes from './views/Quotes.vue';

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        user = data;
        next();
      }
    }).catch((e) => {
      console.log(e);
    });
    if (!user) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
