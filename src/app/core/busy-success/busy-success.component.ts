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

@Component({
  selector: 'app-busy-success',
  templateUrl: './busy-success.component.html',
  styleUrls: ['./busy-success.component.scss'],
})
export class BusySuccessComponent implements OnInit, OnDestroy {

  @Input() killAfter: number;
  @Input() busy: any;
  @Input() createInitial: boolean = false;
  killSub: Subscription;
  visible: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.createInitial) this.show();
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
