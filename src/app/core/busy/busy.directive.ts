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

  @Input('ngBusy') data;
  private busyRef: ComponentRef<BusyComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      if (changes.data.currentValue) {
        // New, non-empty data has arrived!
        if (this.busyRef) {
          this.busyRef.destroy();
          this.busyRef = null;
        }
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else if (!changes.data.currentValue && !this.busyRef) {
        // Empty data, go busy
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
