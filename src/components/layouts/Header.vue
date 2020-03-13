<template lang="pug">
  v-app-bar(
    app
    clipped-left
    color="secondary"
    dark
  )
    v-app-bar-nav-icon(
      @click.stop="abrirNavbar"
      v-if=`$vuetify.breakpoint.width < 1265 && (
        $route.name !== 'Login' &&
        $route.name !== 'Recuperar Senha')`
    )
    v-toolbar-title Teste Header
    v-spacer
    v-tooltip(bottom v-if="$route.name !== 'Login' && $route.name !== 'Recuperar Senha'")
      template( v-slot:activator="{ on }")
        v-btn(
          icon
          dark
          @click="logout"
          v-on="on"
        )
          v-icon mdi-arrow-collapse-right
      span Sair
</template>

<script>
import EventBus from '../../utils/event-bus';

export default {
  name: 'Header',

  methods: {
    abrirNavbar() {
      EventBus.$emit('abrir-navbar');
    },

    logout() {
      this.$router.push('/');
    },
  },
};
</script>
