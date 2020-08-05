import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Location } from "@angular/common";
import {
  QMobileComponent,
  QThemeService,
  QMediaBreakpointsService,
  QDialogService,
} from "galaxy";
import { BundleSelectionComponent } from "../../entry-module/components/bundle/bundle-selection.component";
import { Testset } from "../../../core/data-source/models/test-set";
import { OeModuleType } from "../../../core/data-source/models/oemodule-type";
import { OeLicenseBundle } from "../../../core/data-source/models/oelicense-bundle";
import {
  License,
  LicenseStatus,
} from "../../../core/data-source/models/license";
import { OeLicenseInterface } from "../../../core/data-source/services/oelicense.interface";
import { OeLicenseRelation } from "../../../core/data-source/models/oelicense-relation";
import { FloatLicenseAction } from "../../../core/data-source/models/float-license-action";
import { LicenseHistoryActionEnum } from "../../../core/data-source/models/license-history";

@Component({
  selector: "float-confirm-card",
  styleUrls: ["float-confirm.component.scss"],
  templateUrl: "./float-confirm.component.html",
})
export class FloatConfirmComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() selectedTestset: Testset;
  @Input() conflicts: Array<any>;
  @Input() bundle: OeLicenseBundle;
  @Input() licenseDesc: string;
  @Output() confirmed = new EventEmitter<FloatLicenseAction[]>();
  actions: FloatLicenseAction[] = new Array<FloatLicenseAction>();
  @Input() licenseRelations: OeLicenseRelation[] = new Array();
  @Input() moduleType: OeModuleType;
  @Input() assignedLicenses: License[] = new Array();
  @Input() relatedLicense: License[] = new Array();

  filteredLicense: License[];

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private dialogService: QDialogService,
    private oeLicenseService: OeLicenseInterface,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onAction(action: FloatLicenseAction) {
    const actionIndex = this.actions.findIndex(
      (a) => a.partNumber == action.partNumber
    );
    if (actionIndex > -1) {
      switch (action.action) {
        case LicenseHistoryActionEnum.Cancel:
          this.actions.splice(actionIndex);
          break;
        default:
          this.actions[actionIndex] = action;
      }
    } else {
      this.actions.push(action);
      this.actions = this.actions.slice();
    }
  }

  getAction(license: License) {
    if (!!this.actions) {
      return this.actions.find((a) => a.partNumber == license.partNumber);
    }
    return null;
  }

  getRelations(license: License) {
    if (!!this.licenseRelations)
      return this.licenseRelations.filter(
        (r) => r.sourceLicense.partNumber == license.partNumber
      );
  }

  private filterLicenseByBundle(bundle?: OeLicenseBundle) {
    return new Promise((resolve, reject) => {
      if (!this.relatedLicense) {
        resolve();
      }
      if (!bundle) {
        this.filteredLicense = this.relatedLicense.filter(
          (l) => l.status != LicenseStatus.NotPurchased
        );
      } else {
        this.oeLicenseService.getOeLicenseBundleRelations(bundle.id).then(
          (relations) => {
            this.filteredLicense = this.relatedLicense.filter((l) => {
              return (
                relations.findIndex(
                  (r) => r.oeLicense.partNumber == l.partNumber
                ) >= 0
              );
            });
          },
          (err) => {
            reject(err);
          }
        );
      }
      this.filteredLicense.sort(function (l1, l2) {
        if (l1.status < l2.status) {
          return -1;
        }
        if (l1.status > l2.status) {
          return 1;
        }
        return 0;
      });
      resolve();
    });
  }

  changeBundle(): boolean {
    this.dialogService
      .open(BundleSelectionComponent, {
        context: {
          moduleType: this.moduleType,
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((b) => {
        this.bundle = b;
        this.registerLoader(this.filterLicenseByBundle(b));
        this.load();
      });
    return false;
  }

  ngOnChanges() {
    this.filterLicenseByBundle();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  mock() {
    return false;
  }

  onConfirm() {
    this.confirmed.emit(this.actions);
    return false;
  }
}
