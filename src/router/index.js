import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login'),
  },
  {
    path: '/recuperar-senha',
    name: 'Recuperar Senha',
    component: () => import('../views/RecuperarSenha.vue'),
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  routes,
});

export default router;
