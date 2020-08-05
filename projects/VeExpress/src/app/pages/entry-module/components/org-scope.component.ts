import { Component, Injector, Input, OnInit } from "@angular/core";
import { QDialogComponent } from "galaxy";
import { QServerODataSource, QServerODataSourceConf } from "galaxy";
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserSourceService } from "../../../core/data-source/services/user-source.service";
import { User } from "../../../core/data-source/models/user";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "org-scope",
  templateUrl: "org-scope.component.html",
  styleUrls: ["org-scope.component.scss"]
})
export class OrgScopeDialogComponent extends QDialogComponent
  implements OnInit {
  @Input() company: any;
  private orgs: any = new Array();
  styles: string[] = ["primary", "success", "info", "warning", "danger"];
  private styleIndex: number = 0;

  settings = {
    actions: {
      columnTitle: "",
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: "left" // left|right
    },
    columns: {
      "org.name": {
        title: "Org"
      },
      name: {
        title: "Company/Group",
        width: "60%"
      }
    }
  };

  private cycleStyle = (style?: string) => {
    do {
      this.styleIndex++;
      this.styleIndex =
        this.styleIndex >= this.styles.length ? 0 : this.styleIndex;
    } while (this.styles[this.styleIndex] == style);

    return this.styles[this.styleIndex];
  };

  source: QServerODataSource;

  constructor(
    private userSourceService: UserSourceService,
    injector: Injector
  ) {
    super(injector);
  }

  onSelectRow(row: any) {
    if (!!row.data) {
      let selectedCompany = row.data;
      selectedCompany.style = this.cycleStyle(this.company.style);
      this.company = selectedCompany;
      this.orgs.splice(0);
      if (!!this.company.org) {
        this.company.org.style = this.cycleStyle(this.company.org.style);
        this.orgs.push(this.company.org);
      }
    }
  }

  ngOnInit = (): void => {
    super.ngOnInit();
    if (!!this.company) {
      if (!!this.company.org) {
        this.orgs.push(this.company.org);
      }
    }
    this.userSourceService
      .onUserChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        if (!!user) {
          this.requestUserSource(user.name);
        }
      });
  };

  private requestUserSource(name: string): void {
    const encoded = encodeURI(
      `/api/v1/User/GetCompaniesByUser(name='${name}')`
    );
    const conf = new QServerODataSourceConf(encoded);
    let customHttpParas = new HttpParams();
    customHttpParas = customHttpParas.append("$expand", "Org");
    this.source = new QServerODataSource(
      this.injector.get(HttpClient),
      conf,
      null,
      customHttpParas
    );
  }

  changeOrg(): boolean {
    return false;
  }

  mock(): boolean {
    return false;
  }
}
