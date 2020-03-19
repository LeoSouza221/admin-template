<template lang="pug">
  .producao
    v-toolbar.primary(dark)
      v-toolbar-title Ordens de Serviço
      v-spacer
      i-producao
    v-card
      t-preimpressao
</template>

<script>
import TabelaPreImpressao from './TabelaPreImpressao.vue';
import ItensSelecionadosPreImpressao from './ItensSelecionadosPreImpressao.vue';

export default {
  name: 'Pre-Impressao',

  components: {
    't-preimpressao': TabelaPreImpressao,
    'i-producao': ItensSelecionadosPreImpressao,
  },
};
</script>
