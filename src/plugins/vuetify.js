import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1DE9B6',
        secondary: '#212121',
        accent: '#00BFA5',
        error: '#630803',
        info: '#507097',
        success: '#43A047',
        warning: '#f44185',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
