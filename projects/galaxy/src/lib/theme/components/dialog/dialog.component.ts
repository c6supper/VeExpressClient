import { Component, OnDestroy, OnInit, Injector } from "@angular/core";
import { NbMediaBreakpoint, NbDialogRef } from "@nebular/theme";
import { takeUntil } from "rxjs/operators";
import { QThemeService } from "../../services/theme.service";
import { QMediaBreakpointsService } from "../../services/breakpoints.service";
import { Subject } from "rxjs";

@Component({
  selector: "galaxy-dialog",
  template: ``,
})
export class QDialogComponent implements OnInit, OnDestroy {
  breakpoint: NbMediaBreakpoint = { name: "", width: 0 };
  breakpoints: any = null;
  loading: boolean = false;
  private loaders: Promise<any>[] = [];

  protected destroy$: Subject<void> = new Subject<void>();
  private ref: NbDialogRef<QDialogComponent>;
  private themeService: QThemeService;
  private breakpointService: QMediaBreakpointsService;

  constructor(protected injector: Injector) {
    this.ref = injector.get<NbDialogRef<QDialogComponent>>(NbDialogRef);
    this.themeService = injector.get(QThemeService);
    this.breakpointService = injector.get(QMediaBreakpointsService);
  }

  registerLoader(method: Promise<any>): void {
    this.loaders.push(method);
  }

  load(): void {
    this.loading = true;
    this.executeAll();
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    this.ref.close();
  }

  submit(context: any) {
    this.ref.close(context);
  }
}
