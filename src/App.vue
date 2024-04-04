<script>
import headerApp from './components/headerApp.vue';
import GlobalState from './components/GlobalState.vue';
import { reactive } from 'vue';
import { state } from '.././state.js';



export default {
  components: {
    headerApp,
    GlobalState,
  },
  setup() {
    return {
      state: reactive(state)
    };
  },
};

</script>

<template>
  <headerApp :state="state" />
  <GlobalState />

</template>

<style>
body {
  background-color: #333;

}
</style>
