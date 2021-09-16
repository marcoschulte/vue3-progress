import {App, Plugin, reactive} from 'vue';
import {injectionKey} from './Injector';
import ProgressBar from './ProgressBar.vue';
import {ProgressControls, ProgressFinisher} from './ProgressControls';
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

  const createFinisher = (finishState: { used: boolean }) => {
    return {
      finish: () => {
        if (!finishState.used) {
          finishState.used = true;
          internalState.inflight--;
          updateActive();
        }
      },
    };
  };

  return {
    start(): ProgressFinisher {
      state.active = true;
      internalState.inflight++;
      updateActive();

      return createFinisher({used: false});
    },

    wrap(promise) {
      const finisher = this.start();
      promise.then(() => finisher.finish(), () => finisher.finish());
      return promise;
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
    app.config.globalProperties.$progress = instance;
    app.component('Vue3ProgressBar', ProgressBar);
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $progress: ProgressControls;
  }
}
