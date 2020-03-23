<template lang="pug">
  .impressao
    v-toolbar.primary(flat dark)
      v-toolbar-title Acabamento
    tabs-acabamento
</template>

<script>
import TabsAcabamento from './TabsAcabamento.vue';

export default {
  name: 'Impressao',

  components: {
    TabsAcabamento,
  },
};
</script>
