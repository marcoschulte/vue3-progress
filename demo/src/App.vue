<template>
  <vue3-progress-bar></vue3-progress-bar>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
});
</script>

<style lang="scss">
@import "~@marcoschulte/vue3-progress/dist/";

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  img {
    margin-top: 60px;
  }
}
</style>
