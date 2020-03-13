export default [
  {
    path: '/producao',
    component: () => import('./index.vue'),
    meta: {
      sidebar: {
        icon: 'mdi-factory',
        title: 'Produção',
      },
      props: { roles: ['admin', 'outro'] },
    },
  },
];
