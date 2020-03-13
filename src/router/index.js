import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      props: { roles: [] },
    },
  },
  {
    path: '/recuperar-senha',
    name: 'Recuperar Senha',
    component: () => import('../views/RecuperarSenha.vue'),
    meta: {
      props: { roles: [] },
    },
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const { userType } = store.state;
  const { token } = store.state;
  const { roles } = to.meta.props;

  if (to.name === 'Login') {
    store.dispatch('logout');
    next();
  } else if (roles.includes(userType) && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
