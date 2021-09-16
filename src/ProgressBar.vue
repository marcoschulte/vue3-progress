<template>
  <div v-if="state.show">Test</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useProgress} from './Injector';

export default defineComponent({
  name: 'Vue3ProgressBar',

  setup: () => {
    const state = useProgress().state();
    return {state};
  },

});
</script>

<style scoped lang="scss">
</style>
