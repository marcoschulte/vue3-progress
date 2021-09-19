import {App, Plugin, reactive} from 'vue';
import {holder} from './GlobalInstanceHolder';
import {injectionKey} from './Injector';
import ProgressBar from './ProgressBar.vue';
import {ProgressControls, ProgressFinisher} from './ProgressControls';
import {ProgressState} from './ProgressState';


export interface ProgressOptions {
  disableGlobalInstance: boolean;
}

const state = reactive({
  active: false,
} as ProgressState);

const createPlugin = (): ProgressControls => {
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
      internalState.inflight++;
      updateActive();

      return createFinisher({used: false});
    },

    attach(promise) {
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
    const instance = createPlugin();

    app.provide(injectionKey, instance);
    app.config.globalProperties.$progress = instance;
    if (!options || !options.disableGlobalInstance) {
      holder.instance = instance;
    }
    app.component('Vue3ProgressBar', ProgressBar);
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $progress: ProgressControls;
  }
}
