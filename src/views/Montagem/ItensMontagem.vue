<template lang="pug">
  .zona
    v-row(justify="center")
      v-col(cols="6" sm="2")
        v-text-field(
          label="Aumentar Esteira"
          v-model="tamanhoEsteira"
          :rules="rules.tamanhoEsteira"
          color="primary"
          height="40"
          light
        )
    .container-dropzone
      .dropzone(
        :style="{ width: `${tamanhoEsteira}px` }"
      )
        .item(
          v-for="(item, index) in itemsParaMontagem"
          :key="index"
          :style=`{
            width: definirComprimento(item.largura),
            height: definirAltura(item.altura),
            transform: posicionar(item.posicaoX, item.posicaoY),
            zIndex: index,
          }`
          :class="`item-${index}`"
          v-if="item.selecionadoImpressao"
        )
          v-btn(
            icon
            light
            @click="rotacionar(item)"
            height="20"
            width="20"
          )
            v-icon(small) mdi-rotate-right
        .linha-vertical(
          v-for="(linha, index) in quantidadeDivisoes" :key="linha.posicao"
          :style='{ transform: `translateX(${linha.posicao}px)` }'
        )
</template>

<script>
import interact from 'interactjs';

export default {
  name: 'ItensMontagem',

  props: {
    itemsParaMontagem: Array,
  },

  data: () => ({
    posicaoX: 0,
    posicaoY: 0,
    tamanhoEsteira: 500,
    quantidadeDivisoes: [
      {
        posicao: 500,
      },
    ],
    rules: {
      tamanhoEsteira: [
        (v) => !!v || 'Campo Obrigatório',
        (v) => v >= 500 || 'Não pode ser menor que 500',
      ],
    },
  }),

  mounted() {
    interact('.item').draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
      startAxis: 'xy',
      autoScroll: true,
      onstart: (event) => {
        this.definirPontoInicial(event);
      },
      onmove: (event) => {
        this.mover(event);
      },
      onend: (event) => {
        this.atualizarPosicao(event);
      },
    });

    interact('.dropzone').dropzone({
      accept: '.item',
      overlap: 0,
    });
  },

  computed: {
    cor() {
      return this.$vuetify.theme.themes.light.primary;
    },

    items: {
      get() { return this.itemsParaMontagem; },
      set: () => {},
    },
  },

  methods: {
    posicionarItens(itemsImpressao) {
      this.posicaoX = 0;
      this.posicaoY = 0;
      this.items = itemsImpressao.map((item) => {
        if (!item.posicaoX && !item.posicaoY) {
          return this.definirPosicao(item);
        }
        return item;
      });
    },

    definirPosicao(item) {
      const posicaoAtualX = this.posicaoX;
      const posicaoAtualY = this.posicaoY;

      return Object.assign(item, { posicaoX: posicaoAtualX, posicaoY: posicaoAtualY });
    },

    mover(evento) {
      const { target } = evento;

      const dataX = target.getAttribute('data-x');
      const dataY = target.getAttribute('data-y');
      const initialX = parseFloat(dataX) || 0;
      const initialY = parseFloat(dataY) || 0;
      const deltaX = evento.dx;
      const deltaY = evento.dy;

      const newX = initialX + deltaX;
      const newY = initialY + deltaY;

      target
        .style
        .transform = `translate(${newX}px, ${newY}px)`;

      target.setAttribute('data-x', newX);
      target.setAttribute('data-y', newY);

      this.posicaoProximoItemX = target.offsetWidth + 5;
    },

    atualizarPosicao(evento) {
      const { target } = evento;
      const posicaoItemApresentacao = target.className.slice(-1);
      const dataX = target.getAttribute('data-x');
      const dataY = target.getAttribute('data-y');

      this.items[posicaoItemApresentacao].posicaoX = Math.floor(dataX);
      this.items[posicaoItemApresentacao].posicaoY = Math.floor(dataY);
    },

    definirPontoInicial(evento) {
      const { target } = evento;
      if (!target.getAttribute('data-x') || !target.getAttribute('data-x')) {
        const posicaoItemApresentacao = target.className.slice(-1);

        target.setAttribute('data-x', this.items[posicaoItemApresentacao].posicaoX);
        target.setAttribute('data-y', this.items[posicaoItemApresentacao].posicaoY);
      }
    },

    definirAltura(altura) {
      return `${parseFloat(altura).toFixed(2) / 2}px`;
    },

    definirComprimento(largura) {
      return `${parseFloat(largura).toFixed(2) / 2}px`;
    },

    aumentarTamanhoEsteira() {
      this.tamanhoEsteira += 500;
      this.adicionarLinhaVertical();
    },

    adicionarLinhaVertical(linhaNecessarias) {
      let qtdeLinhasAtuais = Math.floor(this.quantidadeDivisoes.length);

      while (qtdeLinhasAtuais < linhaNecessarias) {
        this.quantidadeDivisoes.push({
          posicao: (500 * (qtdeLinhasAtuais + 1)),
        });

        qtdeLinhasAtuais += 1;
      }
    },

    removerLinhaVertical(linhaNecessarias) {
      let qtdeLinhasAtuais = Math.floor(this.quantidadeDivisoes.length);

      while (qtdeLinhasAtuais > linhaNecessarias) {
        this.quantidadeDivisoes.pop();

        qtdeLinhasAtuais -= 1;
      }
    },

    posicionar(largura, altura) {
      return `translate(${largura}px, ${altura}px)`;
    },

    rotacionar(itemPedido) {
      const posicao = this.items.findIndex((item) => item.id === itemPedido.id);
      const { altura, largura } = this.items[posicao];

      this.items[posicao].altura = largura;
      this.items[posicao].largura = altura;
    },
  },

  watch: {
    itemsParaMontagem() {
      this.posicionarItens(this.itemsParaMontagem);
    },
    tamanhoEsteira() {
      const quantidadeDivisoesNecessarias = parseInt(Math.floor(this.tamanhoEsteira) / 500, 10);

      if (quantidadeDivisoesNecessarias > this.quantidadeDivisoes.length) {
        this.adicionarLinhaVertical(quantidadeDivisoesNecessarias);
        return;
      }
      this.removerLinhaVertical(quantidadeDivisoesNecessarias);
    },
  },
};
</script>

<style scoped>
  .zona {
    width: 100%;
    height: calc(100vh - 80px);
    position: relative;
    background-color: rgb(228, 226, 226);
    overflow: hidden;
  }

  .item {
    touch-action: none;
    user-select: none;
    color: white;
    background-color: #1DE9B6;
    margin: 5px;
    border-radius: 2px;
    box-shadow:
      0 10px 20px rgba(0,0,0,0.19),
      0 6px 6px rgba(0,0,0,0.23);
    position: absolute;
    transition: width 0.5s ease-in, height 0.5s ease-in;
  }

  .container-dropzone {
    max-width: 1000px;
    height: 500px;
    position: absolute;
    overflow-y: hidden;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }

  .dropzone {
    height: 500px;
    display: inline-flex;
    box-shadow:
      0 10px 20px rgba(0,0,0,0.19),
      0 6px 6px rgba(0,0,0,0.23),
      inset 0 10px 20px rgba(0,0,0,0.23),
      inset 6px 6px 6px rgba(0,0,0,0.23);
    transition: width 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    background: white;
    background-image: linear-gradient(rgba(97, 97, 97, 0.7) 1px, transparent 1px),
      linear-gradient(90deg, rgba(97, 97, 97, 0.7) 1px, transparent 1px);
    background-size: 10px 10px;
  }

  .linha-vertical {
    width: 1px;
    height: 100%;
    border: dashed 2px grey;
  }
</style>
