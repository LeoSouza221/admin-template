<template lang="pug">
  v-snackbar(
    top
    v-model="snackbar"
    :color="cor"
  ) {{ mensagem }}
</template>

<script>
export default {
  name: 'Alert',

  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },

    cor() {
      return this.$store.state.cor;
    },

    mensagem() {
      return this.$store.state.mensagem;
    },
  },
};
</script>
