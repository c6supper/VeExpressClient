import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  QServerODataSource,
  QServerODataSourceConf,
  QMobileComponent,
  QThemeService,
  QMediaBreakpointsService,
} from "galaxy";
import { HyperLinkRenderComponent } from "./hyper-link-render.component";
import { Subject, Observable, combineLatest } from "rxjs";
import { Location } from "@angular/common";
@Component({
  selector: "veexpress-license-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent extends QMobileComponent
  implements OnInit, OnDestroy {
  settings = {
    actions: {
      columnTitle: "",
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: "left", // left|right
    },
    columns: {
      partNumber: {
        title: "Part No.",
      },
      description: {
        title: "Description",
        width: "40%",
      },
      total: {
        title: "Total",
        type: "number",
      },
      assigned: {
        title: "Assigned",
        type: "custom-number",
        renderComponent: HyperLinkRenderComponent,
      },
      available: {
        title: "Available",
        type: "custom-number",
        renderComponent: HyperLinkRenderComponent,
      },
    },
    pager: {
      display: true,
      perPage: 8,
    },
  };

  source: QServerODataSource;
  private companyChanged = new Subject<any>();
  private testsetTypeChanged = new Subject<any>();

  constructor(
    http: HttpClient,
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    location: Location
  ) {
    super(themeService, breakpointService, location);

    const conf = new QServerODataSourceConf("/api/v1/OptionSummary");
    this.source = new QServerODataSource(http, conf, []);
  }

  ngOnInit() {
    super.ngOnInit();

    const combinedCondition = combineLatest(
      this.source.onInitialized(),
      this.CompanyChanged(),
      this.TestsetTypeChanged()
    );
    combinedCondition.subscribe((value) => {
      if (value[0] && value[1] && value[2]) {
        this.source.setEndPointsParas([value[1].id, value[2]]);
        this.source.refresh();
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onCompanyChanged(company: any) {
    this.companyChanged.next(company);
  }

  onTestsetTypeChanged(type: number) {
    this.testsetTypeChanged.next(type);
  }

  CompanyChanged(): Observable<any> {
    return this.companyChanged.asObservable();
  }

  TestsetTypeChanged(): Observable<any> {
    return this.testsetTypeChanged.asObservable();
  }
}
