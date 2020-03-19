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
            v-for="(pedido, index) in props.items"
            :key="index"
          )
            v-card(
              width="100%"
              height="200"
            )
              v-toolbar(flat height="40" :color="tabStatus.cor")
                v-toolbar-title Pedido {{ pedido.id }}
                v-spacer
                v-btn.secondary.mx-2(
                  icon
                  height="30"
                  width="30"
                  dark
                  :disabled="!!pedido.hora_inicio"
                )
                  v-icon(small) mdi-play
                v-btn.secondary(
                  icon
                  height="30"
                  width="30"
                  dark
                  :disabled="!!pedido.termino"
                )
                  v-icon(small) mdi-stop
              v-divider
              v-row
                v-col(col="12")
                  ul
                    li.conteudo-card
                      strong Hora início:
                      span  {{ pedido.hora_inicio }}
                    li.conteudo-card
                      strong Término:
                      span  {{ pedido.termino }}
              v-row(justify="center")
                v-btn.secondary(
                  rounded
                  height="40"
                  width="150"
                  @click="abrirItemsImpressao(pedido)"
                  :disabled="!pedido.termino"
                )
                  v-icon(left) mdi-check-all
                  span Verificação
</template>

<script>
import EventBus from '@/utils/event-bus';

export default {
  name: 'TabelaItensImpressao',

  props: {
    tabStatus: Object,
  },

  data: () => ({
    items: {
      erro: [
        {
          id: 1,
          hora_inicio: '13:00',
          termino: '17:00',
          status: 'Erro',
          Erro: [
            {
              nome: 'Banner',
              id: 4,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 5,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Erro',
              altura: '200',
              largura: '100',
            },
          ],
        },
        {
          id: 7,
          hora_inicio: '13:00',
          termino: '17:00',
          status: 'Erro',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 4,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 5,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: false,
              status: 'Erro',
              altura: '200',
              largura: '100',
            },
          ],
        },
        {
          id: 4,
          hora_inicio: '13:00',
          termino: '17:00',
          status: 'Erro',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 4,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 5,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Erro',
              altura: '200',
              largura: '100',
            },
          ],
        },
      ],
      aguardando: [
        {
          id: 2,
          hora_inicio: '13:30',
          termino: null,
          status: 'Aguardando',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 6,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 7,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '200',
              largura: '100',
            },
          ],
        },
        {
          id: 5,
          hora_inicio: '13:30',
          termino: null,
          status: 'Aguardando',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 6,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 7,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '200',
              largura: '100',
            },
          ],
        },
        {
          id: 8,
          hora_inicio: '13:30',
          termino: null,
          status: 'Aguardando',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 6,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 7,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '200',
              largura: '100',
            },
          ],
        },
      ],
      finalizado: [
        {
          id: 3,
          hora_inicio: '9:00',
          termino: '14:00',
          status: 'Finalizado',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 8,
              selecionado: false,
              selecionadoImpressao: false,
              status: 'Aguardando',
              acabamento: false,
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 9,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: false,
              status: 'Aguardando',
              altura: '200',
              largura: '100',
            },
          ],
        },
        {
          id: 6,
          hora_inicio: '9:00',
          termino: '14:00',
          status: 'Finalizado',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 8,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 9,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '200',
              largura: '100',
            },
          ],
        },
        {
          id: 9,
          hora_inicio: '9:00',
          termino: '14:00',
          status: 'Finalizado',
          itemsOrdem: [
            {
              nome: 'Banner',
              id: 8,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '800',
              largura: '600',
            },
            {
              nome: 'Adesivo',
              id: 9,
              selecionado: false,
              selecionadoImpressao: false,
              acabamento: true,
              status: 'Aguardando',
              altura: '200',
              largura: '100',
            },
          ],
        },
      ],
    },
  }),

  methods: {
    abrirItemsImpressao(pedido) {
      EventBus.$emit('abrir-items-impressao', pedido);
    },
  },
};
</script>

<style>
  .conteudo-card {
    font-size: .875rem;
    padding: 5px;
  }
</style>
