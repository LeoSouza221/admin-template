<template lang="pug">
  v-app
    v-fade-transition(mode="out-in")
      router-view
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
