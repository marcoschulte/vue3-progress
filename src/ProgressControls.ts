import {ProgressState} from './ProgressState';

export interface ProgressControls {
  start(): void;

  end(): void;

  state(): ProgressState;
}
