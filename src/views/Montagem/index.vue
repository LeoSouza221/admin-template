<template lang="pug">
  .montagem
    v-dialog(v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition")
      template(v-slot:activator="{ on }")
         v-btn.secondary(
            dark
            outlined
            rounded
            height="40"
            v-on="on"
          ) Iniciar Montagem
      v-card
        v-toolbar.secondary(dark)
          v-btn(
            icon
            dark
            @click="drawer = !drawer"
          )
            v-icon mdi-menu
          v-toolbar-title Montar Impressão
          v-spacer
          v-btn.primary.mx-1(
            icon
            dark
            @click="salvar"
          )
            v-icon mdi-content-save
          v-btn.mx-1(
            icon
            dark
            @click="dialog = !dialog"
          )
            v-icon mdi-close
        navbar-montagem(
          :itemsParaMontagem="itemsParaMontagem"
          :drawer="drawer"
        )
        items-montagem(
          :itemsParaMontagem="itemsParaMontagem"
        )
</template>

<script>
import ItemsMontagem from './ItensMontagem.vue';
import NavbarMontagem from './NavbarMontagem.vue';
import EventBus from '../../utils/event-bus';

export default {
  name: 'Montagem',

  components: {
    ItemsMontagem,
    NavbarMontagem,
  },

  data: () => ({
    dialog: false,
    drawer: true,
    itemsParaMontagem: [],
  }),

  created() {
    this.itemsParaMontagem = this.$store.state.listaItensImpressao;
    EventBus.$on('alterar-estado-navbar', this.fecharNavbar);
  },

  beforeDestroy() {
    EventBus.$off('alterar-estado-navbar');
  },

  methods: {
    fecharNavbar(condicao) {
      this.drawer = condicao;
    },

    salvar() {
      this.$router.push('/producao/impressao');
    },
  },
};
</script>
