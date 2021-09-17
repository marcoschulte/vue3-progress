import {ProgressState} from './ProgressState';

export interface ProgressControls {
  start(): ProgressFinisher;

  attach<V, T extends PromiseLike<V>>(promise: T): T;

  state(): ProgressState;
}

export interface ProgressFinisher {
  finish(): void;
}
