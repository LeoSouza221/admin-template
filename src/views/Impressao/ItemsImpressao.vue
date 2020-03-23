<template lang="pug">
  .items-impressao
    v-dialog(v-model="dialog" persistent max-width="700")
      v-card(style="overflow-x: hidden;")
        v-toolbar.transparent(light flat)
          v-toolbar-title Pedido {{ pedido.id }}
          v-spacer
          v-btn(
            icon
            @click="dialog = !dialog"
          )
            v-icon mdi-close
        v-data-table(
          :items="pedido.itemsOrdem"
          :headers="headers"
          hide-default-footer
          v-model="selecionados"
          item-key="id"
          show-select
        )
          template(v-slot:item.id="{ item }")
            v-edit-dialog(
              large
              persistent
              @save="salvar"
              save-text="Salvar"
              cancel-text="Cancelar"
            )
              v-icon(
                small
                :color="item.observacao ? '#F44336' : ''"
              ) mdi-alert-circle
              template(v-slot:input)
                v-textarea(
                  v-model="item.observacao"
                  label="Mensagem"
                  single-line
                  counter
                )
          template(v-slot:item.acabamento="{ item }")
            td {{ item.acabamento ? 'Sim' : 'Não' }}
        v-row(justify="center")
          v-btn.secondary.my-3(
            rounded
            height="40"
          ) Verificação Finalizada
</template>

<script>
import EventBus from '@/utils/event-bus';

export default {
  name: 'ItemsImpressao',

  data: () => ({
    dialog: false,
    pedido: {},
    selecionados: [],
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome',
      },
      {
        text: 'Status',
        align: 'start',
        value: 'status',
      },
      {
        text: 'Possui Acabamento',
        align: 'start',
        value: 'acabamento',
      },
      {
        text: 'Reportar',
        align: 'center',
        value: 'id',
      },
    ],
  }),

  created() {
    EventBus.$on('abrir-items-impressao', this.abrirModal);
  },

  beforeDestroy() {
    EventBus.$off('abrir-items-impressao');
  },

  methods: {
    abrirModal(pedido) {
      this.pedido = pedido;
      this.dialog = true;
    },

    cancelar() {
    },

    salvar() {
    },
  },
};
</script>
