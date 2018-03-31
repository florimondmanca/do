import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  DoCheck,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';

import { BusyComponent } from './busy.component';

@Directive({ selector: '[ngBusy]'})
export class BusyDirective implements OnChanges {

  @Input('ngBusy') busy;
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
        // The busy signal turned false
        if (this.busyRef) {
          this.busyRef.destroy();
          this.busyRef = null;
        }
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else if (busy.currentValue && !this.busyRef) {
        // The busy signal turned true, go busy
        this.createBusy();
      }
    }
  }

  createBusy() {
    const busyFactory = this.cfResolver.resolveComponentFactory(BusyComponent);
    this.busyRef = this.viewContainer.createComponent(
      busyFactory, null, this.injector);
  }

}
