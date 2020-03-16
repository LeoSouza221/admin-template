export default [
  {
    path: '/producao/:id',
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
