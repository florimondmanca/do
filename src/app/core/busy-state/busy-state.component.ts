import {
  Component,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import {
  Observable,
  Subscription
} from 'rxjs';
import { BusyState } from './busy-state';

@Component({
  selector: 'app-busy-state',
  templateUrl: './busy-state.component.html',
  styleUrls: ['./busy-state.component.scss'],
})
export class BusyStateComponent implements OnInit, OnDestroy {

  @Input() killAfter: number;
  @Input() busy: any;
  @Input() state: BusyState;
  @Input() createInitial: boolean = false;
  killSub: Subscription;
  visible: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.createInitial) this.show();
  }

  get iconName(): string {
    switch(this.state) {
      case BusyState.SUCCESS: return 'check-circle';
      case BusyState.ERROR: return 'exclamation-circle';
      default: return 'question';
    }
  }

  get iconClassName(): string {
    switch(this.state) {
      case BusyState.SUCCESS: return 'success';
      case BusyState.ERROR: return 'error';
      default: return 'unknown';
    }
  }

  clearSub() {
    if (this.killSub) {
      this.killSub.unsubscribe();
      this.killSub = null;
    }
  }

  show() {
    this.visible = true;
    if (this.killAfter) {
      this.clearSub();
      this.killSub = Observable.interval(this.killAfter).subscribe(
        () => {
          this.visible = false;
          this.clearSub();
        }
      );
    }
  }

  onBusyStarted(firstChange: boolean) {
    this.visible = false;
  }

  onBusyFinished(firstChange: boolean) {
    if (!firstChange || this.createInitial) {
      this.show();
    }
  }

  ngOnDestroy() {
    this.clearSub();
  }

}
