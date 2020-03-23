<template lang="pug">
   v-tabs.mt-5(
      v-model="tabSelecionada"
      background-color="secondary"
      centered
      dark
    )
      v-tab(
        v-for="(status, index) in Object.keys(statusImpressao)"
        :key="index"
      ) {{ status }}
      v-tabs-items(v-model="tabSelecionada")
        v-tab-item(
          v-for="(status, index) in statusImpressao"
          :key="index"
        )
          v-card
            tabela-impressao(
              :tabStatus="status"
            )
</template>

<script>
import TabelaItensImpressao from './TabelaItensImpressao.vue';

export default {
  name: 'TabsImpressao',

  components: {
    'tabela-impressao': TabelaItensImpressao,
  },

  data: () => ({
    tabSelecionada: null,
    statusImpressao: {
      erro: {
        texto: 'erro',
        cor: '#F44336',
      },
      finalizado: {
        texto: 'finalizado',
        cor: '#43A047',
      },
      aguardando: {
        texto: 'aguardando',
        cor: '#FFEB3B',
      },
    },
  }),
};
</script>
