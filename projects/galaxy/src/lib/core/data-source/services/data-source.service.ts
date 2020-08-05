import { Subject, Observable, timer, BehaviorSubject } from "rxjs";
import { QAuthJWTToken } from "../../../auth/services/token/token";
import { QAuthService } from "../../../auth/services/auth.service";
import { takeUntil } from "rxjs/operators";
import { Injectable, OnDestroy } from "@angular/core";
import { ODataQuery, ODataService } from "odata-v4-ng";
import { QODataQuery } from "./odata-query";

@Injectable()
export abstract class QODataSourceService implements OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();
  private token: QAuthJWTToken = null;
  protected onChangedSource = new BehaviorSubject<QAuthJWTToken>(null);

  onChanged(): Observable<QAuthJWTToken> {
    return this.onChangedSource.asObservable();
  }

  protected getODataQuery(endPoints: string = "/api/v1/"): QODataQuery {
    return new ODataQuery(this.odataService, endPoints);
  }

  protected onTokenChange(_token: QAuthJWTToken): void {}

  protected emitOnChanged(token: QAuthJWTToken) {
    this.onChangedSource.next(token);
  }

  isValid(): boolean {
    return !!this.token ? this.token.isValid() : false;
  }

  protected postponeInitialize() {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: QAuthJWTToken) => {
        if (this.token !== token) {
          this.token = token;
          this.emitOnChanged(token);
        }
      });
    this.onChanged().subscribe(t => this.onTokenChange(t));
  }

  protected constructor(
    private authService: QAuthService,
    private odataService: ODataService
  ) {
    timer(0).subscribe(_ => this.postponeInitialize());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
