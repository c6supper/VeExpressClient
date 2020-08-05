import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import {
  QThemeService,
  QMobileComponent,
  QServerODataSource,
  QServerODataSourceConf,
  QMediaBreakpointsService,
} from "galaxy";
import { HyperLinkRenderComponent } from "./hyper-link-render.component";
import { Subject, Observable, combineLatest } from "rxjs";

@Component({
  selector: "app-summary",
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
      position: "left",
    },
    columns: {
      moduleType: {
        title: "",
        filter: false,
        sort: false,
      },
      serialNumber: {
        title: "Serial Number",
        type: "custom-text",
        renderComponent: HyperLinkRenderComponent,
      },
      version: {
        title: "Version",
      },
      mac: {
        title: "Mac",
      },
      status: {
        title: "Status",
        type: "enum",
        filter: {
          type: "list",
          config: {
            selectText: "Status",
            list: [
              { value: "1", title: "Approve" },
              { value: "2", title: "Revoke" },
            ],
          },
        },
      },
      connectedDateTime: {
        title: "Last Seen",
        type: "datetime",
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

    const conf = new QServerODataSourceConf("/api/v1/Testset/TestsetSummary");
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
        this.source.setEndPointsParas([
          "companyId=" + value[1].id,
          "testsetTypeId=" + value[2],
        ]);

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
