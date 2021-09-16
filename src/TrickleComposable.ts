import {onBeforeUnmount, ref, watch} from 'vue';
import {ProgressState} from './ProgressState';

export default function trickleComposable(state: ProgressState) {
  const intervalHolder = {interval: null as any};
  const value = ref(0);

  const removeInterval = () => {
    if (intervalHolder.interval) {
      clearInterval(intervalHolder.interval);
      intervalHolder.interval = null;
    }
  };

  const increaseValue = () => {
    value.value = Math.min(value.value + trickleAmount(value.value), 100);
  };

  const stateChanged = () => {
    removeInterval();

    if (state.active) {
      value.value = 0;
      intervalHolder.interval = setInterval(() => increaseValue(), 300);

    } else {
      value.value = 100;
      intervalHolder.interval = setInterval(() => value.value = 0, 500);
    }
  };

  watch(() => state.active, () => {
    stateChanged();
  });

  onBeforeUnmount(() => removeInterval());

  if (state.active) {
    stateChanged();
  }

  return {
    value,
  };
}

function trickleAmount(n: number): number {
  if (n < 20) {
    return 10;
  } else if (n < 50) {
    return 4;
  } else if (n < 80) {
    return 2;
  } else if (n < 99) {
    return 0.5;
  }
  return 0;
}
