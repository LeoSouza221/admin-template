<template lang="pug">
  .tabela-itens
    v-data-iterator(
      :items="items[tabStatus.texto]"
      no-data-text="Sem Items para Impressão"
      hide-default-footer
    )
      template(v-slot:default="props")
        v-row(justify="center")
          v-col(
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(item, index) in props.items"
            :key="index"
          )
            v-card(
              width="100%"
              :height="item.observacao ? '500px' : '200px'"
              style="overflowY: hidden; transform: height 0.4s ease-in"
            )
              v-toolbar(flat height="40" :color="tabStatus.cor")
                v-toolbar-title {{ item.nome }}
                v-spacer
                v-btn.secondary(
                  icon
                  height="30"
                  width="30"
                  dark
                  :disabled="!!item.hora_inicio"
                )
                  v-icon(small) mdi-play
                v-btn.secondary.mx-2(
                  icon
                  height="30"
                  width="30"
                  dark
                  :disabled="!!item.termino"
                )
                  v-icon(small) mdi-stop
                v-btn.secondary(
                  icon
                  height="30"
                  width="30"
                  dark
                  @click="item.observacao = true"
                  :disabled="!item.termino"
                )
                  v-icon(small) mdi-alert-circle
              v-divider
              v-container
                v-row(justify="center")
                  v-col(col="12")
                    ul
                      li.conteudo-card
                        strong Hora início:
                        span  {{ item.hora_inicio }}
                      li.conteudo-card
                        strong Término:
                        span  {{ item.termino }}
                  v-col(col="6" offset="3" offset-md="2")
                    v-btn.secondary(
                      height="40"
                      @click="corrigir(item)"
                      color="alert"
                      rounded
                      :disabled="!item.termino"
                    )
                      v-icon(left) mdi-check-all
                      span Verificação
                  v-col(cols="10")
                    v-textarea(
                      label="Reportar"
                    )
                  v-col(col="6" offset="4")
                    v-btn.secondary.mx-1(
                      icon
                      dark
                      @click="item.observacao = false"
                    )
                      v-icon mdi-check
                    v-btn.secondary.mx-1(
                      icon
                      dark
                      @click="item.observacao = false"
                    )
                      v-icon mdi-close
</template>

<script>
// import EventBus from '@/utils/event-bus';

export default {
  name: 'TabelaItensAcabamento',

  props: {
    tabStatus: Object,
  },

  data: () => ({
    items: {
      erro: [
        {
          nome: 'Banner',
          id: 10,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Erro',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 1,
            hora_inicio: '13:00',
            termino: '17:00',
            status: 'Erro',
          },
        },
        {
          nome: 'Adesivo',
          id: 11,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Erro',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 1,
            hora_inicio: '13:00',
            termino: '17:00',
            status: 'Erro',
          },
        },
        {
          nome: 'Banner',
          id: 12,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Erro',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 7,
            hora_inicio: '13:00',
            termino: '17:00',
            status: 'Erro',
          },
        },
        {
          nome: 'Adesivo',
          id: 13,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Erro',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 7,
            hora_inicio: '13:00',
            termino: '17:00',
            status: 'Erro',
          },
        },
      ],
      aguardando: [
        {
          nome: 'Banner',
          id: 14,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 4,
            hora_inicio: '13:00',
            termino: '17:00',
            status: 'Erro',
          },
        },
        {
          nome: 'Adesivo',
          id: 15,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 4,
            hora_inicio: '13:00',
            termino: '17:00',
            status: 'Erro',
          },
        },
        {
          nome: 'Banner',
          id: 16,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 2,
            hora_inicio: '13:30',
            termino: null,
            status: 'Aguardando',
          },
        },
        {
          nome: 'Adesivo',
          id: 17,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 2,
            hora_inicio: '13:30',
            termino: null,
            status: 'Aguardando',
          },
        },
        {
          nome: 'Banner',
          id: 18,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 5,
            hora_inicio: '13:30',
            termino: null,
            status: 'Aguardando',
          },
        },
        {
          nome: 'Adesivo',
          id: 19,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 5,
            hora_inicio: '13:30',
            termino: null,
            status: 'Aguardando',
          },
        },
        {
          nome: 'Banner',
          id: 20,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 8,
            hora_inicio: '13:30',
            termino: null,
            status: 'Aguardando',
          },
        },
        {
          nome: 'Adesivo',
          id: 21,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Aguardando',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: null,
          pedido: {
            id: 8,
            hora_inicio: '13:30',
            termino: null,
            status: 'Aguardando',
          },
        },
      ],
      finalizado: [
        {
          nome: 'Banner',
          id: 22,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Finalizado',
          observacao: false,
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 3,
            hora_inicio: '9:00',
            termino: '14:00',
            status: 'Finalizado',
          },
        },
        {
          nome: 'Adesivo',
          id: 23,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Finalizado',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 3,
            hora_inicio: '9:00',
            termino: '14:00',
            status: 'Finalizado',
          },
        },
        {
          nome: 'Banner',
          id: 24,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Finalizado',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 6,
            hora_inicio: '9:00',
            termino: '14:00',
            status: 'Finalizado',
          },
        },
        {
          nome: 'Adesivo',
          id: 25,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Finalizado',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 6,
            hora_inicio: '9:00',
            termino: '14:00',
            status: 'Finalizado',
          },
        },
        {
          nome: 'Banner',
          id: 26,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Finalizado',
          altura: '800',
          largura: '600',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 9,
            hora_inicio: '9:00',
            termino: '14:00',
            status: 'Finalizado',
          },
        },
        {
          nome: 'Adesivo',
          id: 27,
          selecionado: false,
          selecionadoImpressao: false,
          status: 'Finalizado',
          altura: '200',
          largura: '100',
          hora_inicio: '13:00',
          termino: '17:00',
          pedido: {
            id: 9,
            hora_inicio: '9:00',
            termino: '14:00',
            status: 'Finalizado',
          },
        },
      ],
    },
  }),

  methods: {
    reportar() {},

    corrigir() {},
  },
};
</script>

<style>
  .conteudo-card {
    font-size: .875rem;
    padding: 5px;
  }
</style>
