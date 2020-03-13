<template lang="pug">
  v-card(height="400")
    v-toolbar(flat)
      v-toolbar-title.primary--text Um Gráfico de Curvas
    v-sparkline(
      :value="valoresGrafico"
      :labels="textosGraficos"
      height="70"
      padding="12"
      color="primary"
      line-width="1"
    )
      template.primary--text( v-slot:label="item") {{ item.value }}
</template>

<script>
export default {
  name: 'SparklineDashboard',

  data: () => ({
    valoresGrafico: [
      100, 20, 340, 45, 541, 68, 74, 81,
    ],
    textosGraficos: [
      'Texto 1',
      'Texto 2',
      'Texto 3',
      'Texto 4',
      'Texto 5',
      'Texto 6',
      'Texto 7',
      'Texto 8',
    ],
  }),
};
</script>
