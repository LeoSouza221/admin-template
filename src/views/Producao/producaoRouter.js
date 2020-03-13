export default [
  {
    path: '/producao',
    name: 'Producao',
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
