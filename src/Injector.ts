import {inject, InjectionKey} from 'vue';
import {holder} from './GlobalInstanceHolder';
import {ProgressControls} from './ProgressControls';

export const injectionKey: InjectionKey<ProgressControls> = Symbol(
  'Vue3Progress',
);

export const useProgress = (): ProgressControls => {
  return holder.instance || inject(injectionKey) as ProgressControls;
};
