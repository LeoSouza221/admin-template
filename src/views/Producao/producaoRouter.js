import users from '@/utils/users';

export default [
  {
    path: '/producao',
    component: () => import('./index.vue'),
    meta: {
      sidebar: {
        icon: 'mdi-factory',
        title: 'Produção',
      },
    },
    children: [
      {
        path: '/producao/pre-impressao',
        component: () => import('../PreImpressao/index.vue'),
        meta: {
          sidebar: {
            title: 'Pré-impressão',
          },
          props: { roles: users.IMPRESSOR },
        },
      },
      {
        path: '/producao/impressao',
        component: () => import('../Impressao/index.vue'),
        meta: {
          sidebar: {
            title: 'Impressão',
          },
          props: { roles: users.GERENTE },
        },
      },
      {
        path: '/producao/acabamento',
        component: () => import('../Acabamento/index.vue'),
        meta: {
          sidebar: {
            title: 'Acabamento',
          },
          props: { roles: users.ACABAMENTO },
        },
      },
      {
        path: '/producao/entrega',
        component: () => import('../Entrega/index.vue'),
        meta: {
          sidebar: {
            title: 'Entrega',
          },
          props: { roles: users.RECEPCAO },
        },
      },
      {
        path: '/producao/instalacao',
        component: () => import('../Instalacao/index.vue'),
        meta: {
          sidebar: {
            title: 'Instalação',
          },
          props: { roles: users.INSTALACAO },
        },
      },
    ],
  },
];
