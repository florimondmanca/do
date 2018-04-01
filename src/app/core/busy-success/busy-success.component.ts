import {
  Component, OnInit, OnDestroy, Input,
  ViewChild, ViewContainerRef, ComponentRef,
  ComponentFactoryResolver, ComponentFactory,
} from '@angular/core';
import { AngularFontAwesomeComponent as faComponent } from 'angular-font-awesome';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-busy-success',
  templateUrl: './busy-success.component.html',
  styleUrls: ['./busy-success.component.scss']
})
export class BusySuccessComponent implements OnInit, OnDestroy {

  @Input() killAfter: number;
  @Input() busy: any;
  @Input() createInitial: boolean = false;
  @ViewChild('container', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<faComponent>;
  factory: ComponentFactory<faComponent>;
  killSub: Subscription;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.factory = this.resolver.resolveComponentFactory(faComponent);
    if (this.createInitial) this.createComponent();
  }

  clearSub() {
    if (this.killSub) {
      this.killSub.unsubscribe();
      this.killSub = null;
    }
  }

  createComponent() {
    this.container.clear();
    this.componentRef = this.container.createComponent(this.factory);
    this.componentRef.instance.name = "check-circle";
    if (this.killAfter) {
      this.clearSub();
      this.killSub = Observable.interval(this.killAfter).subscribe(
        () => {
          this.destroyComponent();
          this.clearSub();
        }
      );
    }
  }

  onBusyFinished(firstChange: boolean) {
    if (!firstChange || this.createInitial) {
      this.createComponent();
    }
  }

  destroyComponent() {
    this.componentRef && this.componentRef.destroy();
  }

  ngOnDestroy() {
    this.destroyComponent();
    this.clearSub();
  }

}
