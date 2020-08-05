import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbMediaBreakpoint } from "@nebular/theme";
import { map, takeUntil } from "rxjs/operators";
import { QThemeService } from "../../services/theme.service";
import { QMediaBreakpointsService } from "../../services/breakpoints.service";
import { Subject } from "rxjs";
import { Location } from "@angular/common";

@Component({
  selector: "galaxy-mobile",
  template: ``,
})
export abstract class QMobileComponent implements OnInit, OnDestroy {
  protected breakpoint: NbMediaBreakpoint = { name: "", width: 0 };
  protected breakpoints: any = null;
  protected componentSize: any = "medium";
  protected destroy$: Subject<void> = new Subject<void>();
  loading: boolean = false;
  private loaders: Promise<any>[] = [];

  constructor(
    private themeService: QThemeService,
    private breakpointService: QMediaBreakpointsService,
    private location: Location
  ) {}

  registerLoader(method: Promise<any>): void {
    this.loaders.push(method);
  }

  load(): void {
    this.loading = true;
    this.executeAll();
  }

  onGoBack() {
    this.location.back();
  }

  private executeAll(done = () => {}): void {
    Promise.all(this.loaders)
      .then((values) => {
        done.call(null, values);
      })
      .catch((error) => {
        // TODO: Promise.reject should show messagebox
        console.error(error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });
    this.themeService
      .onMediaQueryChange()
      .pipe(
        takeUntil(this.destroy$),
        map(([, breakpoint]) => breakpoint.width)
      )
      .subscribe((width: number) => {
        this.componentSize = width > this.breakpoints.md ? "medium" : "small";
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
