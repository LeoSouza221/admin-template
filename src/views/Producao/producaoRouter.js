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
          props: { roles: users.IMPRESSOR() },
        },
      },
      {
        path: '/producao/impressao',
        component: () => import('../Impressao/index.vue'),
        meta: {
          sidebar: {
            title: 'Impressão',
          },
          props: { roles: users.GERENTE() },
        },
      },
    ],
  },
];
