import users from '@/utils/users';

export default [
  {
    path: '/dashboard/:id?',
    component: () => import('./index.vue'),
    meta: {
      sidebar: {
        icon: 'mdi-chart-bell-curve',
        title: 'Dashboards',
      },
      props: { roles: users.ADMIN() },
    },
  },
];
