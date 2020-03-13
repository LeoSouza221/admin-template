<template lang="pug">
  .producao
    v-container
      v-toolbar.primary(dark)
        v-toolbar-title Ordens de Serviço
        v-spacer
        i-producao
      v-card
        tabela-producao
</template>

<script>
import TabelaProducao from './TabelaProducao.vue';
import ItensSelecionadosProducao from './ItensSelecionadosProducao.vue';

export default {
  name: 'Producao',

  components: {
    TabelaProducao,
    'i-producao': ItensSelecionadosProducao,
  },
};
</script>
