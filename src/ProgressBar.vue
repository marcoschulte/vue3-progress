<template>
  <div class="vue3-progress-bar-container" v-bind:active="state.active">
    <div class="vue3-progress-bar" :style="style"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useProgress} from './Injector';
import trickleComposable from './TrickleComposable';

export default defineComponent({
  name: 'Vue3ProgressBar',

  setup: () => {
    const state = useProgress().state();
    const {value} = trickleComposable(state);
    return {state, value};
  },

  computed: {
    style() {
      return {
        transform: `translate3d(${this.value - 100}%,0,0)`,
      };
    },
  },

});
</script>

<style lang="scss">
$vue3-progress-bar-container-z-index: 999999 !default;
$vue3-progress-bar-container-transition: all 500ms ease !default;

$vue3-progress-bar-color: #42b983 !default;
$vue3-progress-bar-height: 2px !default;
$vue3-progress-bar-transition: all 200ms ease !default;

.vue3-progress-bar-container {
  position: fixed;
  z-index: $vue3-progress-bar-container-z-index;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: $vue3-progress-bar-container-transition;

  &[active="true"] {
    opacity: 1;
    transition: none;
  }

  .vue3-progress-bar {
    width: 100%;
    height: $vue3-progress-bar-height;
    transform: translate3d(-100%, 0, 0);
    background-color: $vue3-progress-bar-color;
    transition: $vue3-progress-bar-transition;
  }
}

</style>
