<template lang="pug">
  v-card(height="200" width="200")
    v-row(justify="center")
      v-col.cardValor(cols="12")
        span.primary--text {{ valor }}
      v-col.cardTexto(cols="12")
        h3 {{ texto }}
</template>

<script>
export default {
  name: 'Card',

  props: {
    valor: String,
    texto: String,
  },
};
</script>

<style scoped>
.cardValor {
  font-size: 60px;
  text-align: center;
}

.cardTexto {
  text-align: center;
}
</style>
