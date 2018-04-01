import { Injectable } from '@angular/core';
import { default as Diff } from 'deep-diff';

@Injectable()
export class DiffService {
  // Simple service to store a model and compare
  // if it has changed in a future call.

  // Base for diffing
  base: any;

  constructor() { }

  set(obj: any) {
    // Register a copy of an object
    this.base = Object.assign({}, obj);
  }

  hasChanged(obj: any): boolean {
    const changes = Diff.diff(obj, this.base);
    return Boolean(changes);
  }

  unset() {
    this.base = null;
  }

}
