import {App, Plugin, reactive} from 'vue';
import {injectionKey} from './Injector';
import ProgressBar from './ProgressBar.vue';
import {ProgressControls, ProgressEnder} from './ProgressControls';
import {ProgressState} from './ProgressState';


export interface ProgressOptions {
}

const state = reactive({
  active: false,
} as ProgressState);


const createPlugin = (options?: ProgressOptions): ProgressControls => {
  const internalState = {inflight: 0};
  const updateActive = () => {
    state.active = internalState.inflight > 0;
  };

  const createEnder = (enderState: { used: boolean }) => {
    return {
      end: () => {
        if (!enderState.used) {
          enderState.used = true;
          internalState.inflight--;
          updateActive();
        }
      },
    };
  };

  return {
    start(): ProgressEnder {
      state.active = true;
      internalState.inflight++;
      updateActive();

      return createEnder({used: false});
    },
    state(): ProgressState {
      return state;
    },
  };
};

export const Vue3ProgressPlugin: Plugin = {
  install: (app: App, options?: ProgressOptions) => {
    const instance = createPlugin(options);
    app.provide(injectionKey, instance);

    app.component('Vue3ProgressBar', ProgressBar);
  },
};
