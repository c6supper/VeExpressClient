import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  QThemeService,
  QMediaBreakpointsService,
  QMobileComponent,
  QDialogService,
} from "galaxy";
import { UserSourceService } from "../../../core/data-source/services/user-source.service";
import { TestsetSourceService } from "../../../core/data-source/services/testset-source.service";
import { TestsetType } from "../../../core/data-source/models/testsettype";
import { takeUntil } from "rxjs/operators";
import { OrgScopeDialogComponent } from "./org-scope.component";
import { Company } from "../../../core/data-source/models/company";
import { LocalUserSourceService } from "../../../core/data-source/services/local-user-source.service";
import { Location } from "@angular/common";
@Component({
  selector: "veexpress-product-org-scope",
  templateUrl: "./product-org-scope.component.html",
  styleUrls: ["./product-org-scope.component.scss"],
})
export class ProductOrgScopeComponent extends QMobileComponent
  implements OnInit, OnDestroy {
  private styles: string[] = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
  ];
  private styleIndex = 0;

  private cycleStyle = () => {
    this.styleIndex++;
    this.styleIndex =
      this.styleIndex >= this.styles.length ? 0 : this.styleIndex;
    return this.styles[this.styleIndex];
  };

  testsetTypes: TestsetType[] = null;
  company: any = null;
  orgs: any = new Array();
  selectedType: number;

  @Output() onSelectedType = new EventEmitter<number>();
  @Output() onSelectedCompany = new EventEmitter<Company>();

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private userSourceService: UserSourceService,
    private testsetSourceService: TestsetSourceService,
    private localUserSourceService: LocalUserSourceService,
    private dialogService: QDialogService,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  private clearData() {
    this.company = null;
    this.onSelectedCompany.emit(null);
    this.orgs.splice(0);
  }

  ngOnInit() {
    super.ngOnInit();
    this.testsetSourceService
      .onTypeChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((types) => {
        this.changeTestsetTypes(types);
      });

    this.userSourceService
      .onUserCompaniesChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((companies) => {
        if (!!companies && companies.length > 0) {
          // choose a default company
          this.company = companies[0];
          this.company.style = this.cycleStyle();
          if (!!this.company.org) {
            this.company.org.style = this.cycleStyle();
            this.orgs.push(this.company.org);
          }
          this.onSelectedCompany.emit(this.company);
        } else {
          this.clearData();
        }
      });

    this.localUserSourceService
      .TestsetTypeChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((type) => {
        if (type != null) {
          this.changeType(type);
        }
      });

    this.localUserSourceService
      .CompanyChanged()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company) => {
        if (company != null) {
          this.clearData();
          this.company = company;
          this.orgs.push(this.company.org);
          this.onSelectedCompany.emit(company);
        }
      });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.localUserSourceService.onTestsetTypeChanged(this.selectedType);
    this.localUserSourceService.onCompanyChanged(this.company);
  }

  changeTestsetTypes(types: TestsetType[]) {
    if (!!types) {
      this.testsetTypes = types;
      this.changeType(this.testsetTypes.find((_) => true).id);
    }
  }

  mock(): boolean {
    return false;
  }

  changeType(type: number) {
    this.selectedType = type;
    this.onSelectedType.emit(type);
  }

  changeScope(): boolean {
    this.dialogService
      .open(OrgScopeDialogComponent, {
        context: {
          company: this.company,
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((company) => {
        if (!!company && this.company.id !== company.id) {
          this.clearData();
          this.company = company;
          this.orgs.push(this.company.org);
          this.onSelectedCompany.emit(company);
        }
      });
    return false;
  }
}
