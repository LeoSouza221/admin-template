<template lang="pug">
  .tabela-producao
    v-row(justify="center")
      v-col(cols="5")
        v-select(
          label="Impressoras"
        )
      v-btn.primary.mt-4(
        icon
        dark
      )
        v-icon mdi-magnify
    v-data-table(
      :items="itemsTabela"
      :headers="headers"
      show-expand
      single-expand
      no-data-text="Sem Orderns de Serviço"
      hide-default-footer
      item-key="id"
    )
      template(v-slot:item.status="{ item }")
        v-row(justify="center")
          div(
            :style=`{
              width: '20px',
              height: '20px',
              backgroundColor: 'yellow',
              borderRadius: '50%',
            }`
          )
      template(v-slot:item.id="{ item }")
        v-icon.mr-2(
          small
          @click=""
        ) mdi-pencil
        v-icon(
          small
          @click=""
        ) mdi-delete
      template(v-slot:expanded-item="{ headers, item }")
        td(:colspan="headers.length")
          v-row(justify="center")
            v-col(
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(pedido, index) in item.itemsOrdem"
              :key="index"
            )
              div(style="display: inline-flex")
                v-checkbox(
                  v-model="pedido.selecionado"
                  :disabled="pedido.status === 'Finalizado'"
                  @click.stop="marcarSelecionados(pedido, item)"
                )
                v-card(width="200" height="200")
                  v-card-text(style="text-align: center")
                    h3 Pedido {{ pedido.nome }}
                  v-card-text
                    ul
                      li Status: {{ pedido.status }}
</template>

<script>
export default {
  name: 'TabelaProducao',

  data: () => ({
    selecionados: [],
    itemsTabela: [
      {
        id: 1,
        numero: 23424234,
        data: '01/01/2020',
        status: 'Aguardando',
        itemsOrdem: [
          {
            nome: 'Banner',
            id: 1,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '800',
            largura: '600',
          },
          {
            nome: 'Adesivo',
            id: 2,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '200',
            largura: '100',
          },
          {
            nome: 'Banner 2',
            id: 3,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '600',
            largura: '300',
          },
          {
            nome: 'Banner 3',
            id: 7,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '100',
            largura: '60',
          },
          {
            nome: 'Adesivo 4',
            id: 8,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '200',
            largura: '80',
          },
          {
            nome: 'Banner 5',
            id: 9,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '60',
            largura: '30',
          },
          {
            nome: 'Banner 6',
            id: 10,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '100',
            largura: '60',
          },
          {
            nome: 'Adesivo 5',
            id: 11,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '200',
            largura: '80',
          },
          {
            nome: 'Banner 7',
            id: 12,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '60',
            largura: '30',
          },
          {
            nome: 'Adesivo 2',
            id: 4,
            selecionado: true,
            selecionadoImpressao: false,
            status: 'Finalizado',
            altura: '15',
            largura: '40',
          },
        ],
      },
      {
        id: 2,
        numero: 23424234,
        data: '01/01/2020',
        status: 'Finalizaco',
        itemsOrdem: [
          {
            nome: 'Banner',
            id: 5,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '100',
            largura: '60',
          },
          {
            nome: 'Adesivo',
            id: 6,
            selecionado: false,
            selecionadoImpressao: false,
            status: 'Aguardando',
            altura: '100',
            largura: '60',
          },
        ],
      },

    ],
    headers: [
      {
        text: 'Número',
        align: 'start',
        value: 'numero',
      },
      {
        text: 'Data',
        align: 'start',
        value: 'data',
      },
      {
        text: 'Status',
        align: 'center',
        value: 'status',
      },
      {
        text: 'Ações',
        align: 'center',
        value: 'id',
      },
    ],
  }),

  beforeDestroy() {
    this.$store.dispatch('limparListaImpressao');
  },

  methods: {
    marcarSelecionados(pedido, item) {
      const posicaoPedidoSelecionado = (
        this.selecionados.findIndex((selecionado) => selecionado.id === pedido.id)
      );

      const posicaoItem = (
        this.itemsTabela.findIndex((itemTab) => itemTab.id === item.id)
      );

      const posicaoItemPedidoNaTabela = (
        this.itemsTabela[posicaoItem]
          .itemsOrdem.findIndex((itemOrdem) => itemOrdem.id === pedido.id)
      );

      if (posicaoPedidoSelecionado !== -1 && pedido.selecionado) {
        this.selecionados.splice(posicaoPedidoSelecionado, 1);
        this.itemsTabela[posicaoItem].itemsOrdem[posicaoItemPedidoNaTabela].selecionado = false;
        this.atualizarListaImpressao('remover', pedido);
      } else {
        this.selecionados.push(pedido);
        this.itemsTabela[posicaoItem].itemsOrdem[posicaoItemPedidoNaTabela].selecionado = true;
        this.atualizarListaImpressao('adicionar', pedido);
      }
    },

    atualizarListaImpressao(acao, pedido) {
      this.$store.dispatch('imprimir', { acao, pedido })
        .then(() => {})
        .catch((err) => console.log(err));
    },

  },
};
</script>
