<template lang="pug">
  .home
    header-layout
    p-navbar
    v-content
      v-slide-y-transition(mode="out-in")
        router-view
</template>

<script>
import HeaderLayout from '../components/layouts/Header.vue';
import FooterLayout from '../components/layouts/Footer.vue';
import NavBar from '../components/layouts/Navbar.vue';

export default {
  name: 'HomePage',

  components: {
    HeaderLayout,
    FooterLayout,
    'p-navbar': NavBar,
  },
};
</script>
