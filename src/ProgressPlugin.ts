import {App, Plugin, reactive} from 'vue';
import {injectionKey} from './Injector';
import ProgressBar from './ProgressBar.vue';
import {ProgressControls} from './ProgressControls';
import {ProgressState} from './ProgressState';


export interface ProgressOptions {
}

const state = reactive({
  active: false,
} as ProgressState);


const createPlugin = (options?: ProgressOptions): ProgressControls => {
  console.log('Creating instance with options', options);

  return {
    start: () => {
      console.log('Start');
      state.active = true;
    },
    end() {
      console.log('End');
      state.active = false;
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
