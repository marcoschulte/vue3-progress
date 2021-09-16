import {inject, InjectionKey} from 'vue';
import {ProgressControls} from './ProgressControls';

export const injectionKey: InjectionKey<ProgressControls> = Symbol(
  'Vue3Progress',
);

export const useProgress = (): ProgressControls => {
  return inject(injectionKey) as ProgressControls;
};
