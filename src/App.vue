<template lang="pug">
  v-app
    alert
    v-fade-transition(mode="out-in")
      router-view
</template>

<script>
import Alert from './components/ui/Alert.vue';

export default {
  name: 'App',

  components: {
    Alert,
  },

  data: () => ({
    //
  }),
};
</script>
