import Vue from 'vue';
import Vuex from 'vuex';
import routes from '@/router/routes';
// import http from '../utils/http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    status: '',
    userType: null,
    msg: '',
    authRoutes: [],
    listaItensImpressao: [],
  },

  mutations: {
    authRequest(state) {
      state.status = 'loading';
    },
    authSuccessToken(state, token) {
      state.status = 'success';
      state.token = token;
    },
    defineUser(state, user) {
      state.userType = user;
    },
    authError(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.authRoutes = [];
      state.userType = null;
    },
    defineRoutes(state, rota) {
      state.authRoutes.push(rota);
    },
    listaAdicionar(state, pedido) {
      state.listaItensImpressao.push(pedido);
    },
    listaRemover(state, pedido) {
      const posicao = state.listaItensImpressao.findIndex((item) => item.id === pedido.id);

      state.listaItensImpressao.splice(posicao, 1);
    },
    limparLista(state) {
      state.listaItensImpressao = [];
    },
  },
  actions: {
    login: ({ commit, dispatch }, user) => {
      commit('authRequest');
      return new Promise((resolve) => {
        // http.post('/', user)
        //   .then((resp) => {
        //     const { token } = resp.data;
        //     localStorage.setItem('token', token);

        //     commit(authSuccess, token);
        //     resolve(resp);
        //   })
        //   .catch((err) => {
        //     commit(authError, err);

        //     localStorage.removeItem('token');
        //     reject(err);
        //   });
        localStorage.setItem('token', '21232342');
        commit('authSuccessToken', '21232342');
        commit('defineUser', user);
        dispatch('filtrarRotas', routes)
          .then(() => resolve());
      });
    },

    logout: ({ commit }) => {
      commit('authRequest');
      return new Promise((resolve) => {
        console.log('aki');
        localStorage.removeItem('token');
        commit('logout');
        resolve();
      });
    },

    filtrarRotas: ({ commit, getters }, rotas) => new Promise((resolve) => {
      rotas.forEach((rota) => {
        if (getters.hasPermission(rota.meta.props.roles)) {
          commit('defineRoutes', rota);
        }
      });
      resolve();
    }),

    imprimir: ({ commit }, info) => new Promise((resolve) => {
      const { acao, pedido } = info;
      const atualizarLista = {
        adicionar: (itemPedido) => {
          commit('listaAdicionar', itemPedido);
        },
        remover: (itemPedido) => {
          commit('listaRemover', itemPedido);
        },
      };

      resolve(atualizarLista[acao](pedido));
    }),

    limparListaImpressao: ({ commit }) => new Promise((resolve) => {
      commit('limparLista');
      resolve();
    }),
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    hasPermission: (state) => (permission) => permission.includes(state.userType),
  },
  modules: {
  },
});
