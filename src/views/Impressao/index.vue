<template lang="pug">
  .impressao
    v-toolbar.primary(flat dark)
      v-toolbar-title Itens Impressão
    tabs-impressao
    itens-impressao
</template>

<script>
import ItensImpressao from './ItemsImpressao.vue';
import TabsImpressao from './TabsImpressao.vue';

export default {
  name: 'Impressao',

  components: {
    ItensImpressao,
    TabsImpressao,
  },
};
</script>
