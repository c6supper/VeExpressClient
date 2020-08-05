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
  QDialogService,
  QTranslateService,
} from "galaxy";
import { LicenseSourceService } from "../../../core/data-source/services/license-source.service";
import { QMessageBoxComponent } from "projects/galaxy/src/lib/theme/components/message-box/message-box.component";
import { OeLicenseInterface } from "../../../core/data-source/services/oelicense.interface";
import {
  OeLicenseRelation,
  RelationType,
} from "../../../core/data-source/models/oelicense-relation";
import { OeModuleTypeInterface } from "../../../core/data-source/services/oemodule-type.interface";
import { takeUntil, map } from "rxjs/operators";
import { OeModuleType } from "../../../core/data-source/models/oemodule-type";
import { Location } from "@angular/common";

@Component({
  selector: "release-conflict-card",
  styleUrls: ["release-conflict.component.scss"],
  templateUrl: "./release-conflict.component.html",
})
export class ReleaseConflictComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() company: string;
  @Input() partNumber: string;
  @Input() selectedTestset: any;
  @Output() resolved = new EventEmitter<any>();
  confirmResolved = false;
  licenses: Array<any> = new Array<any>();
  oeLicenseRelation: Array<any> = new Array<any>();
  moduleType: OeModuleType;

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private licenseService: LicenseSourceService,
    private dialogService: QDialogService,
    private translateService: QTranslateService,
    private oeLicenseService: OeLicenseInterface,
    private oeModuleTypeService: OeModuleTypeInterface,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();
    this.oeLicenseRelation.length = this.licenses.length = 0;
    this.confirmResolved = false;
  }

  private initializeModuleType() {
    return new Promise((resolve, reject) => {
      this.oeModuleTypeService
        .getModuleType(this.selectedTestset.serialNumber)
        .pipe(
          takeUntil(this.destroy$),
          map((type) => {
            this.moduleType = type;
            resolve();
            (err) => {
              reject(err);
            };
          })
        )
        .toPromise();
    });
  }

  private initializeLicenses() {
    return new Promise((resolve, reject) => {
      this.licenseService.getTestsetLicense(this.selectedTestset.id).then(
        (licenses) => {
          this.licenses = licenses;
          resolve();
        },
        (err) => reject(err)
      );
    });
  }

  private updateConflicts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.initializeModuleType().then(
        (_) =>
          this.initializeLicenses().then(
            (_) => {
              this.oeLicenseService
                .getOeLicenseRelations(
                  this.moduleType.id,
                  this.partNumber,
                  RelationType.RequireSingle
                )
                .then(
                  (ors) => {
                    this.oeLicenseRelation = ors.filter(
                      (r) =>
                        this.licenses.findIndex(
                          (l) => l.partNumber == r.targetLicense.partNumber
                        ) >= 0
                    );
                    if (
                      !!this.oeLicenseRelation &&
                      this.oeLicenseRelation.length < 1
                    ) {
                      this.markAsResolved();
                    }
                    resolve(ors);
                  },
                  (err) => reject(err)
                );
            },
            (err) => reject(err)
          ),
        (err) => reject(err)
      );
    });
  }

  ngOnChanges() {
    if (!!this.selectedTestset) {
      this.registerLoader(this.updateConflicts());
      this.load();
    }
  }

  onConfirmation(relation: OeLicenseRelation): Boolean {
    if (this.confirmResolved) {
      return false;
    }
    this.dialogService
      .open(QMessageBoxComponent, {
        context: {
          title: this.translateService.instant("app.generic.warning"),
          submitDescription: this.translateService.instant(
            "app.pages.license.release-stepper.resolveconflicts.release"
          ),
          cancelDescription: this.translateService.instant(
            "app.pages.license.release-stepper.resolveconflicts.keep"
          ),
          message: this.translateService.instant(
            "app.pages.license.generic.release-conflict-warning",
            {
              partNumber: relation.targetLicense.partNumber,
              requiredPartNumber: this.partNumber,
            }
          ),
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((confirmation) => {
        this.oeLicenseRelation.find(
          (r) => r.id == relation.id
        ).resolved = !!confirmation;
      });
    return false;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.confirmResolved = false;
  }

  markAsResolved() {
    this.resolved.emit(this.oeLicenseRelation);
    this.confirmResolved = true;
    return false;
  }
  mock() {
    return false;
  }
}
