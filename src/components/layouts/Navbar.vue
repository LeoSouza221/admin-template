<template lang="pug">
  v-navigation-drawer(
    app
    clipped
    v-model="drawer"
    color="secondary"
    dark
    width="300"
  )
    v-list(nav)
      v-list-item.my-3(
        link
        dense
        v-for="item in itemsNavbar"
        :key="item.meta.sidebar.title"
        :to='item.path'
        active-class="white--text"
      )
        v-list-item-icon
          v-icon {{ item.meta.sidebar.icon }}
        v-list-item-content
          v-list-item-title {{ item.meta.sidebar.title }}
</template>

<script>
import EventBus from '../../utils/event-bus';

export default {
  name: 'Navbar',

  data: () => ({
    drawer: true,
    itemsNavbar: [],
  }),

  created() {
    this.definirItemsNavbar();
    EventBus.$on('abrir-navbar', this.abrirNavbar);
  },

  beforeDestroy() {
    EventBus.$off('abrir-navbar');
  },

  methods: {
    definirItemsNavbar() {
      this.itemsNavbar = this.$store.state.authRoutes;
    },

    abrirNavbar() {
      this.drawer = true;
    },

  },
};
</script>

<style scoped>
  .v-list-group__items {
    background-color: white;
  }
</style>
