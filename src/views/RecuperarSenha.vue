<template lang="pug">
  .recuperar
    layout-header
    v-row(align="center" justify="center" style="height: 100%")
      v-col(
        cols="10"
        md="auto"
        :offset="$vuetify.breakpoint.width > 400 && $vuetify.breakpoint.width < 500 ? 1 : 0"
      )
        v-card.elevation-10(
          width="350"
          height="250"
          flat
        )
          v-toolbar(flat height="50")
            v-toolbar-title Recuperar Senha
          v-form(ref="loginForms")
            v-row(justify="center" no-gutters style="padding-top: 40px;")
              v-col(
                cols="11"
              )
                v-text-field(
                  label="Email"
                  light
                  append-icon="fa fa-envelope"
                  type="text"
                  height="40"
                )
              v-col(cols="11")
                v-row(justify="center" no-gutters)
                  v-btn.primary(
                    rounded
                    dark
                    height="50"
                    width="200"
                    to="/"
                  ) Enviar
</template>

<script>
import LayoutHeader from '../components/layouts/Header.vue';

export default {
  name: 'RecuperarSenha',

  components: {
    LayoutHeader,
  },
};
</script>

<style scoped>
  .recuperar {
    width: 100vw;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
