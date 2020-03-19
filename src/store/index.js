import Vue from 'vue';
import Vuex from 'vuex';
import routes from '@/router/routes';
// import http from '../utils/http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    userType: null,
    snackbar: false,
    status: '',
    mensagem: '',
    cor: 'success',
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
    defineRoutes(state, rotas) {
      state.authRoutes = rotas;
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
    exibirMensagem(state, mensagem) {
      state.mensagem = mensagem;
    },
    mudarCor(state, cor) {
      state.cor = cor;
    },
    abrirSnackbar(state, estado) {
      state.snackbar = estado;
    },
    fecharSnackbar(state) {
      state.snackbar = false;
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
          .then((rotasFiltradas) => {
            commit('defineRoutes', rotasFiltradas);
            resolve();
          });
      });
    },

    logout: ({ commit }) => {
      commit('authRequest');

      return new Promise((resolve) => {
        localStorage.removeItem('token');
        commit('logout');
        resolve();
      });
    },

    filtrarRotas: ({ getters, dispatch }, rotas) => new Promise((resolve) => {
      const teste = [];
      rotas.forEach((rota) => {
        if (rota.children) {
          const { children, ...infos } = rota;
          dispatch('filtrarRotas', rota.children)
            .then((rotasFiltradas) => {
              infos.children = rotasFiltradas;
              teste.push(infos);
            });
          return;
        }
        if (getters.hasPermission(rota.meta.props.roles)) teste.push(rota);
      });
      resolve(teste);
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

    abrirAlerta: ({ commit, dispatch }, parametros) => new Promise((resolve) => {
      const { mensagem, cor, snackbar } = parametros;

      commit('exibirMensagem', mensagem);
      commit('mudarCor', cor);
      commit('abrirSnackbar', snackbar);

      setTimeout(() => {
        dispatch('fecharAlerta');
      }, 5000);

      resolve();
    }),

    fecharAlerta: ({ commit }) => new Promise((resolve) => {
      commit('fecharSnackbar');

      resolve();
    }),
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    hasPermission: (state) => (permission) => permission.includes(state.userType),
  },
});
