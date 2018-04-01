import {
  Directive,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  DoCheck,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';

import { BusyComponent } from './busy.component';

@Directive({ selector: '[ngBusy]'})
export class BusyDirective implements OnChanges, OnDestroy {

  @Input('ngBusy') busy;
  @Output() finished: EventEmitter<boolean> = new EventEmitter();
  private busyRef: ComponentRef<BusyComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    const busy: SimpleChange = changes.busy;
    if (busy) {
      if (!busy.currentValue) {
        this.destroyBusy();
        this.createView();
        this.finished.emit(busy.isFirstChange());
      }
      else if (busy.currentValue && !this.busyRef) {
        this.createBusy();
      }
    }
  }

  createView() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  createBusy() {
    this.viewContainer.clear();
    const busyFactory = this.cfResolver.resolveComponentFactory(BusyComponent);
    this.busyRef = this.viewContainer.createComponent(
      busyFactory, null, this.injector);
  }

  destroyBusy() {
    if (this.busyRef) {
      this.busyRef.destroy();
      this.busyRef = null;
    }
  }

  ngOnDestroy() {
    this.destroyBusy();
  }

}
