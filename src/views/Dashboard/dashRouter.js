export default [
  {
    path: '/dashboard',
    component: () => import('./index.vue'),
    meta: {
      sidebar: {
        icon: 'mdi-chart-bell-curve',
        title: 'Dashboards',
      },
      props: { roles: ['admin'] },
    },
  },
];
