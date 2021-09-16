import {ProgressState} from './ProgressState';

export interface ProgressControls {
  start(): ProgressEnder;

  state(): ProgressState;
}

export interface ProgressEnder {
  end(): void;
}
