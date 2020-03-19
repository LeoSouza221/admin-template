<template lang="pug">
  .dashboard
    v-container
      v-toolbar.primary(dark)
        v-toolbar-title Dashboard
      v-row(
        justify="center"
        align="center"
      )
        v-col(
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(item, index) in valoresCards" :key="index"
        )
          card(:valor="item.valor" :texto="item.texto")
        v-col(cols="12")
          sparkline
</template>

<script>
import Card from '../../components/ui/Card.vue';
import Sparkline from './SparklineDashboard.vue';

export default {
  name: 'Dashboard',

  components: {
    Card,
    Sparkline,
  },

  data: () => ({
    valoresCards: [
      {
        valor: '500',
        texto: 'Unidades',
      },
      {
        valor: '300',
        texto: 'Algo',
      },
      {
        valor: '55,4',
        texto: 'Dereguis',
      },
      {
        valor: '400,23',
        texto: 'Jhonsons',
      },
    ],
  }),
};
</script>
