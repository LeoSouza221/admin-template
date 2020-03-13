<template lang="pug">
  .login-form
    v-form(ref="loginForms" v-model="validaLogin")
      v-row(justify="center" no-gutters)
        v-col.my-5(
          cols="11"
        )
          v-text-field(
            label="Email"
            color="primary"
            append-icon="fa fa-envelope"
            type="text"
            :rules="[]"
            height="40"
            light
            v-model="userType"
          )
        v-col(
          cols="11"
        )
          v-text-field(
            label="Senha"
            color="primary"
            :rules="rules.senha"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'password' : 'text'"
            @click:append="showPassword = !showPassword"
            height="40"
            light
          )
        v-btn.my-5.secondary(
          rounded
          height="40"
          width="150"
          :disabled="!validaLogin"
          @click="login"
        ) Enviar
        div(style="width: 100%; height: 50px; display: flex; justify-content: center")
          router-link(style="font-size: 12px;" to='/recuperar-senha') Esqueci minha senha
</template>

<script>
import Home from '../Home.vue';

export default {
  name: 'LoginForm',

  data: () => ({
    validaLogin: false,
    showPassword: false,
    userType: 'admin',
    homeRoute: {
      path: '/home',
      component: Home,
      name: 'Home',
      children: [],
    },
    rules: {
      email: [
        (v) => !!v || 'Campo Obrigatório',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email inválido',
      ],
      senha: [
        (v) => !!v || 'Campo Obrigatório',
      ],
    },
  }),

  methods: {
    login() {
      this.$store.dispatch('login', this.userType)
        .then(() => {
          const childrenRoutes = this.$store.state.authRoutes;
          this.mostrarRotasAutorizadas(childrenRoutes);
        })
        .catch((err) => console.log(err));
    },

    mostrarRotasAutorizadas(childrenRoutes) {
      this.homeRoute.children = childrenRoutes;
      this.$router.addRoutes([this.homeRoute]);
      this.$router.push('/home');
    },
  },
};
</script>
