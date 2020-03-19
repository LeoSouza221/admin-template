<template lang="pug">
  .login-container
    layout-header
    v-row(align="center" justify="center" style="height: 100%")
      v-card.elevation-10(
        width="350"
        height="370"
        flat
      )
        v-toolbar.transparent(flat height="50")
          v-toolbar-title Login
        LoginForm
    layout-footer
</template>

<script>
import LayoutHeader from '@/components/layouts/Header.vue';
import LayoutFooter from '@/components/layouts/Footer.vue';
import LoginForm from './LoginForm.vue';

export default {
  name: 'Login',

  components: {
    LoginForm,
    LayoutHeader,
    LayoutFooter,
  },

  data: () => ({
    tabsContent: [
      {
        nome: 'Login',
      },
      {
        nome: 'Cadastro',
      },
    ],
  }),
};
</script>

<style scoped>
  .login-container {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
