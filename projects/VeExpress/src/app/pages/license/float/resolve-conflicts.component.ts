import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import {
  QThemeService,
  QMediaBreakpointsService,
  QMobileComponent,
  QTranslateService,
} from "galaxy";
import {
  OeLicenseRelation,
  RelationType,
} from "../../../core/data-source/models/oelicense-relation";
import { OeModuleType } from "../../../core/data-source/models/oemodule-type";
import { FloatLicenseAction } from "../../../core/data-source/models/float-license-action";
import { LicenseHistoryActionEnum } from "../../../core/data-source/models/license-history";
import {
  License,
  LicenseStatus,
} from "../../../core/data-source/models/license";
import { Location } from "@angular/common";
@Component({
  selector: "resolve-conflicts-card",
  styleUrls: ["resolve-conflicts.component.scss"],
  templateUrl: "./resolve-conflicts.component.html",
})
export class ResolveConflictComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() company: string;
  @Input() partNumber: string;
  @Input() selectedTestset: any;
  @Input() licenseRelations: OeLicenseRelation[];
  @Input() moduleType: OeModuleType;
  @Input() relatedLicenseWithAction: any[];
  @Input() assignedLicenses: Array<License> = new Array<License>();
  @Input() relatedLicense: Array<License> = new Array<License>();
  resolvedLicenses: Array<License> = new Array<License>();
  @Output() resolved = new EventEmitter<any[]>();
  confirmResolved = false;
  conflictedRelatedLicenseWithAction: any[] = new Array();

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private translateService: QTranslateService,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges() {
    this.resolvedLicenses = this.assignedLicenses;
    this.confirmResolved = false;
    this.conflictedRelatedLicenseWithAction.length = 0;
    if (!!this.selectedTestset) {
      this.registerLoader(this.updateConflicts());
      this.load();
    }
  }

  onAction(action: FloatLicenseAction) {
    const idx = this.conflictedRelatedLicenseWithAction.findIndex(
      (rl) => rl.license.partNumber == action.partNumber
    );
    if (idx > -1) {
      switch (action.action) {
        case LicenseHistoryActionEnum.Cancel:
          this.conflictedRelatedLicenseWithAction[idx].action = null;
          break;
        default:
          this.conflictedRelatedLicenseWithAction[idx].action = action;
      }
    } else {
      this.conflictedRelatedLicenseWithAction[idx].action = action;
    }
  }

  getRelations(license: License) {
    return this.licenseRelations.filter(
      (r) => r.sourceLicense.partNumber == license.partNumber
    );
  }

  private updateConflict(license: License, action: FloatLicenseAction) {
    switch (action.action) {
      case LicenseHistoryActionEnum.Release:
        this.licenseRelations.forEach((lr) => {
          if (
            lr.sourceLicense.partNumber == license.partNumber &&
            lr.relationType.relationType == RelationType.RequireSingle
          ) {
            this.relatedLicense.forEach((rl) => {
              if (
                rl.partNumber == lr.targetLicense.partNumber &&
                (rl.status == LicenseStatus.Activated ||
                  rl.status == LicenseStatus.Assigned)
              ) {
                const tips = this.translateService.instant(
                  "app.pages.license.generic.release-conflict-warning",
                  {
                    partNumber: rl.partNumber,
                    requiredPartNumber: lr.sourceLicense.partNumber,
                  }
                );
                if (
                  this.conflictedRelatedLicenseWithAction.findIndex(
                    (crl) => crl.license.partNumber == rl.partNumber
                  ) < 0
                ) {
                  this.conflictedRelatedLicenseWithAction.push({
                    license: rl,
                    tips: tips,
                  });
                }
              }
            });
          }
        });
        break;
      case LicenseHistoryActionEnum.Assign:
        this.licenseRelations.forEach((lr) => {
          if (
            lr.sourceLicense.partNumber == license.partNumber &&
            lr.relationType.relationType == RelationType.Excluded
          ) {
            this.relatedLicense.forEach((rl) => {
              if (
                rl.partNumber == lr.targetLicense.partNumber &&
                (rl.status == LicenseStatus.Activated ||
                  rl.status == LicenseStatus.Assigned)
              ) {
                const tips = this.translateService.instant(
                  "app.pages.license.generic.assign-conflict-warning",
                  {
                    partNumber: lr.sourceLicense.partNumber,
                    conflict: lr.sourceLicense.partNumber,
                  }
                );
                if (
                  this.conflictedRelatedLicenseWithAction.findIndex(
                    (crl) => crl.license.partNumber == rl.partNumber
                  ) < 0
                ) {
                  this.conflictedRelatedLicenseWithAction.push({
                    license: rl,
                    tips: tips,
                  });
                }
              }
            });
          }
        });
        break;
    }
  }

  private updateConflicts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.relatedLicenseWithAction.forEach((rla) => {
        if (!!rla.action) {
          this.updateConflict(rla.license, rla.action);
        }
      });
      resolve();
      if (this.conflictedRelatedLicenseWithAction.length <= 0) {
        this.markAsResolved();
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.confirmResolved = false;
  }

  markAsResolved() {
    this.resolved.emit(this.conflictedRelatedLicenseWithAction);
    this.confirmResolved = true;
    return false;
  }
  mock() {
    return false;
  }
}
