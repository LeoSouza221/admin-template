<template lang="pug">
  v-navigation-drawer(
    v-model="controleNavbar"
    color="secondary"
    dark
    width="300"
    absolute
    temporary
  )
    v-list
      v-list-item.my-3(
        dense
        v-for="item in itemsParaMontagem"
        :key="item.id"
        active-class="white--text"
      )
        v-checkbox(
          v-model="item.selecionadoImpressao"
          :label="item.nome"
          @click.stop="marcarSelecionado(item)"
          dense
        )
      v-divider
</template>

<script>
import EventBus from '../../utils/event-bus';

export default {
  name: 'NavbarMontagem',

  props: {
    itemsParaMontagem: Array,
    drawer: Boolean,
  },

  computed: {
    controleNavbar: {
      get() { return this.drawer; },
      set: (newValue) => { EventBus.$emit('alterar-estado-navbar', newValue); },
    },
  },

  methods: {
    marcarSelecionado(item) {
      const posicaoItem = (
        this.itemsParaMontagem.findIndex((itemTab) => itemTab.id === item.id)
      );
      const valorCheckbox = !this.itemsParaMontagem[posicaoItem].selecionadoImpressao;

      this.itemsParaMontagem[posicaoItem].selecionadoImpressao = valorCheckbox;
    },
  },
};
</script>
