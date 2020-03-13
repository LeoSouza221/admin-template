<template lang="pug">
  v-dialog(v-model="dialog" persistent max-width="350")
    template(v-slot:activator="{ on }")
      v-badge(
        :content="tamanhoListaImpressao"
        color="accent"
        overlap
        v-on="on"
      )
        v-btn.secondary(
          icon
          dark
          @click="dialog = !dialog"
          :disabled="tamanhoListaImpressao === 0"
        )
          v-icon large mdi-printer
    v-card
      v-toolbar
        v-toolbar-title Itens Impressão
        v-spacer
        v-btn.primry(
          icon
          dark
          @click="dialog=!dialog"
        )
          v-icon(large color="primary") mdi-close
      v-container
        v-data-iterator(
          :items="itensImpressao"
          :headers="headers"
          hide-default-footer
        )
          template(v-slot:default="props")
            v-row
              v-col(
                v-for="pedido in props.items"
                :key="pedido.name"
                cols="12"
              )
                v-card()
                  v-card-text(style="text-align: center")
                    h3 {{ pedido.nome }}
                  v-card-text
                    ul
                      li Status: {{ pedido.status }}
        v-row(justify="center")
          montagem
</template>

<script>
import Montagem from '../Montagem/index.vue';

export default {
  name: 'ItensSelecionadosProducao',

  components: {
    Montagem,
  },

  data: () => ({
    dialog: false,
    headers: [
      {
        title: 'Nome',
        align: 'start',
        value: 'nome',
      },
      {
        title: 'Status',
        align: 'start',
        value: 'status',
      },
    ],
  }),

  computed: {
    tamanhoListaImpressao() {
      return this.$store.state.listaItensImpressao.length;
    },

    itensImpressao() {
      return this.$store.state.listaItensImpressao;
    },
  },
};
</script>
