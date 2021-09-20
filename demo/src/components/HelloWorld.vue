<template>
  <div>
    <h1>Demo for vue3-progress</h1>
    <p>
      Use the controls below to start / stop the progress bar.
    </p>
    <p>
      Find documentation at <a href="https://github.com/marcoschulte/vue3-progress">Github</a> or <a
        href="https://www.npmjs.com/package/@marcoschulte/vue3-progress">npmjs</a>.
    </p>
    <h3>Controls</h3>
    <p>
      <button @click="start">Start</button>
      <button @click="stop">Stop</button>
    </p>
    <p>
      Active progresses {{ progresses.length }}
    </p>
  </div>
</template>

<script lang="ts">
import {ProgressFinisher, useProgress} from '@marcoschulte/vue3-progress';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'HelloWorld',

  data() {
    return {
      progresses: [] as ProgressFinisher[],
    };
  },

  methods: {
    start() {
      const progress = useProgress().start();
      this.progresses.push(progress);
    },
    stop() {
      this.progresses.pop()?.finish();
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

button {
  margin-right: 0.5rem;
}

button:last-child {
  margin-right: 0rem;
}
</style>
