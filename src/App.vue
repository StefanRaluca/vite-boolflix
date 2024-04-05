<script>
import headerApp from './components/headerApp.vue';
import { reactive } from 'vue';
import { state } from '.././state.js';
import MainApp from './components/mainApp.vue';



export default {
  components: {
    headerApp,
    MainApp,
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
  <MainApp />

</template>

<style>
body {
  background-color: #333;

}
</style>
