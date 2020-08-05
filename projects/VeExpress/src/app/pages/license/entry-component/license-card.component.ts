import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  License,
  LicenseStatus,
} from "../../../core/data-source/models/license";
import {
  QDialogService,
  QTranslateService,
  QMobileComponent,
  QMediaBreakpointsService,
  QThemeService,
} from "galaxy";
import { QMessageBoxComponent } from "projects/galaxy/src/lib/theme/components/message-box/message-box.component";
import { Testset } from "../../../core/data-source/models/test-set";
import {
  OeLicenseRelation,
  RelationType,
} from "../../../core/data-source/models/oelicense-relation";
import { FloatLicenseAction } from "../../../core/data-source/models/float-license-action";
import { LicenseHistoryActionEnum } from "../../../core/data-source/models/license-history";
import { Location } from "@angular/common";
@Component({
  selector: "license-card",
  styleUrls: ["license-card.component.scss"],
  templateUrl: "./license-card.component.html",
})
export class LicenseCardComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() license: License;
  @Input() tips: string;
  @Input() selectedTestset: Testset;
  @Input() assignedLicenses?: License[];
  @Input() licenseRelations: OeLicenseRelation[];
  @Output() actionEventEmitter = new EventEmitter<FloatLicenseAction>();
  @Input() action: FloatLicenseAction;

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private dialogService: QDialogService,
    private translateService: QTranslateService,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges() {}

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  status(status: string) {
    switch (status) {
      case LicenseStatus.Activated:
        return this.translateService.instant(
          "app.pages.license.license-card.status.activated"
        );
      case LicenseStatus.Assigned:
        return this.translateService.instant(
          "app.pages.license.license-card.status.assigned"
        );
      case LicenseStatus.Idle:
        return this.translateService.instant(
          "app.pages.license.license-card.status.idle"
        );
      case LicenseStatus.Releasing:
        return this.translateService.instant(
          "app.pages.license.license-card.status.releasing"
        );
      case LicenseStatus.NotPurchased:
        return this.translateService.instant(
          "app.pages.license.license-card.status.not-purchased"
        );
      case LicenseStatus.Licensed:
        return this.translateService.instant(
          "app.pages.license.license-card.status.licensed"
        );
      default:
        return status;
    }
  }

  color(status: string) {
    switch (status) {
      case LicenseStatus.Activated:
        return "success";
      case LicenseStatus.Assigned:
      case LicenseStatus.Licensed:
      case LicenseStatus.Releasing:
        return "primary";
      case LicenseStatus.Idle:
        return "warning";
      default:
        return "danger";
    }
  }

  actionString(action: string) {
    switch (action) {
      case LicenseHistoryActionEnum.Assign:
        return this.translateService.instant(
          "app.pages.license.license-card.badge.assign"
        );
      case LicenseHistoryActionEnum.Release:
        return this.translateService.instant(
          "app.pages.license.license-card.badge.release"
        );
      default:
        return "";
    }
  }

  formatLicenseInfo(license: License) {
    if (!!this.tips) {
      return this.tips;
    }
    switch (license.status) {
      case LicenseStatus.Activated:
        return this.translateService.instant(
          "app.pages.license.license-card.tips.activated"
        );
      case LicenseStatus.Assigned:
        return this.translateService.instant(
          "app.pages.license.license-card.tips.assigned"
        );
      case LicenseStatus.Licensed:
        return this.translateService.instant(
          "app.pages.license.license-card.tips.licensed"
        );
      case LicenseStatus.Releasing:
        return this.translateService.instant(
          "app.pages.license.license-card.tips.releasing"
        );
      case LicenseStatus.Idle:
        return this.translateService.instant(
          "app.pages.license.license-card.tips.idle"
        );
      case LicenseStatus.NotPurchased:
        return this.translateService.instant(
          "app.pages.license.license-card.tips.not-purchased"
        );
      default:
        return "";
    }
  }

  onConfirmation(): Boolean {
    let action = "";
    let message = "";
    switch (this.license.status) {
      case LicenseStatus.Activated:
      case LicenseStatus.Assigned:
        action = this.translateService.instant(
          "app.pages.license.license-card.release"
        );
        this.licenseRelations.forEach((r) => {
          if (r.relationType.relationType == RelationType.RequireSingle) {
            message += this.translateService.instant(
              "app.pages.license.generic.release-conflict-warning",
              {
                partNumber: r.targetLicense.partNumber,
                requiredPartNumber: this.license.partNumber,
              }
            );
          }
        });
        if (message == "") {
          message += this.translateService.instant(
            "app.pages.license.generic.release-warning",
            {
              partNumber: this.license.partNumber,
              serialNumber: this.selectedTestset.serialNumber,
            }
          );
        }
        break;
      case LicenseStatus.Idle:
        action = this.translateService.instant(
          "app.pages.license.license-card.assign"
        );
        this.licenseRelations.forEach((r) => {
          if (r.relationType.relationType == RelationType.Excluded) {
            message += this.translateService.instant(
              "app.pages.license.generic.assign-conflict-warning",
              {
                partNumber: r.targetLicense.partNumber,
                conflict: this.license.partNumber,
              }
            );
          }
        });
        if (message == "") {
          message = this.translateService.instant(
            "app.pages.license.generic.assign-warning",
            {
              partNumber: this.license.partNumber,
              serialNumber: this.selectedTestset.serialNumber,
            }
          );
        }
        break;
      default:
        return false;
    }
    this.dialogService
      .open(QMessageBoxComponent, {
        context: {
          title: this.translateService.instant("app.generic.warning"),
          submitDescription: action,
          cancelDescription: this.translateService.instant(
            "app.generic.cancel"
          ),
          message: message,
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((confirmation) => {
        let action: FloatLicenseAction = {
          action: LicenseHistoryActionEnum.Unknown,
          partNumber: this.license.partNumber,
          testsetId: this.selectedTestset.id,
        };
        if (confirmation) {
          switch (this.license.status) {
            case LicenseStatus.Activated:
            case LicenseStatus.Assigned:
              action.action = LicenseHistoryActionEnum.Release;
              break;
            case LicenseStatus.Idle:
              action.action = LicenseHistoryActionEnum.Assign;
              break;
          }
        } else {
          action.action = LicenseHistoryActionEnum.Cancel;
        }
        this.action = action;
        this.actionEventEmitter.emit(action);
      });
    return false;
  }

  mock() {
    return false;
  }
}
