<template lang="pug">
  .tabela-padrao
    v-data-table(
      :items="items"
      :headers="headers"
      :no-data-text="textoTabelaVazia"
      hide-default-footer
      :show-expand="expandir"
      single-expand
      no-data-text="textoSemInfo"
      item-key="id"
    )
      //- template(v-slot:item="{ item }")
      //-   tr
      //-     slot(
      //-       name="table-rows"
      //-       v-bind:item="item"
      //-     )
      template(v-slot:expanded-item="{ headers, item }")
        td(:colspan="headers.length")
          slot(
            name="table-expanded"
            v-bind:item="item"
          )
    v-divider
    v-row(justify-center)
      v-col(cols="12" sm="2")
        v-select.mx-2(
          label="Itens por página"
          outlined
          v-model="itensNaPagina"
          :items="arrayItensNaPagina"
        )
      v-col(cols="12" sm="8")
        v-pagination(
          circle
          :length="3"
        )
</template>

<script>
export default {
  name: 'Tabela',

  props: {
    items: Array,
    headers: Array,
    textoTabelaVazia: String,
    expandir: Boolean,
  },

  data: () => ({
    itensNaPagina: 10,
    arrayItensNaPagina: [10, 25, 50],
  }),
};
</script>

<style scope>
  .v-pagination__item {
    border: solid 1px rgba(0,0,0,.24);
  }
</style>
