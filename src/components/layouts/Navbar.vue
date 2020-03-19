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
      template(v-for="item in itemsNavbar")
        v-list-item.my-3(
          link
          :key="item.meta.sidebar.title"
          :to='item.path'
          active-class="white--text"
          v-if="!item.children"
        )
          v-list-item-icon
            v-icon {{ item.meta.sidebar.icon }}
          v-list-item-content
            v-list-item-title {{ item.meta.sidebar.title }}
        v-list-group.my-3(
          :key="item.meta.sidebar.title"
          active-class="white--text"
          v-else
          v-model="item.active"
          :prepend-icon="item.meta.sidebar.icon"
          no-action
        )
          template(v-slot:activator)
            v-list-item-content
              v-list-item-title {{ item.meta.sidebar.title }}
          v-list-item.my-3(
            link
            dense
            v-for="subItem in item.children"
            :key="subItem.meta.sidebar.title"
            :to='subItem.path'
            active-class="white--text"
          )
            v-list-item-content
              v-list-item-title {{ subItem.meta.sidebar.title }}
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
