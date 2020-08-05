import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import {
  QThemeService,
  QMediaBreakpointsService,
  QMobileComponent,
} from "galaxy";
import { ActivatedRoute } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Testset } from "../../../core/data-source/models/test-set";
import { from } from "../../../core/data-source/models/helper";
import { FloatLicenseAction } from "../../../core/data-source/models/float-license-action";
import { OeLicenseInterface } from "../../../core/data-source/services/oelicense.interface";
import { OeLicenseRelation } from "../../../core/data-source/models/oelicense-relation";
import { OeModuleTypeInterface } from "../../../core/data-source/services/oemodule-type.interface";
import { takeUntil, map } from "rxjs/operators";
import { OeModuleType } from "../../../core/data-source/models/oemodule-type";
import {
  LicenseStatus,
  License,
} from "../../../core/data-source/models/license";
import { LicenseSourceService } from "../../../core/data-source/services/license-source.service";

@Component({
  selector: "license-float-stepper",
  styleUrls: ["float-stepper.component.scss"],
  templateUrl: "./float-stepper.component.html",
})
export class FloatStepperComponent extends QMobileComponent
  implements OnInit, OnDestroy {
  testset: Testset;
  actions = new FormControl("", [Validators.required]);
  conflicts = new FormControl("", [Validators.required]);
  @ViewChild("stepper", { static: true }) stepper;
  licenseRelations: OeLicenseRelation[];
  moduleType: OeModuleType;
  relatedLicense: License[];
  assignedLicenses: License[];
  confirmed = new FormControl("", [Validators.required]);
  relatedLicenseWithAction: any[] = new Array();

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private route: ActivatedRoute,
    private oeModuleTypeService: OeModuleTypeInterface,
    private oeLicenseService: OeLicenseInterface,
    private licenseService: LicenseSourceService,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  private initializeModuleType() {
    return new Promise((resolve, reject) => {
      this.oeModuleTypeService
        .getModuleType(this.testset.serialNumber)
        .pipe(
          takeUntil(this.destroy$),
          map((type) => {
            this.moduleType = type;
            this.initializeLicenseRelations(type.id).then(
              (_) => resolve(),
              (err) => {
                reject(err);
              }
            );
          })
        )
        .toPromise();
    });
  }

  private initializeLicenseRelations(typeId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oeLicenseService.getOeLicenseRelationsByModule(typeId).then(
        (relations) => {
          this.licenseRelations = relations;
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  private initializeLicenses() {
    return new Promise((resolve, reject) => {
      this.licenseService
        .getTestsetRelatedLicense(this.testset.serialNumber)
        .then(
          (licenses) => {
            this.relatedLicense = licenses;
            this.assignedLicenses = licenses.filter(
              (l) =>
                l.status == LicenseStatus.Activated ||
                l.status == LicenseStatus.Assigned ||
                l.status == LicenseStatus.Licensed ||
                l.status == LicenseStatus.Releasing
            );
            resolve();
          },
          (err) => reject(err)
        );
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      this.testset = from<Testset>(params);
    });

    this.registerLoader(this.initializeLicenses());
    this.registerLoader(this.initializeModuleType());
    this.load();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.actions.reset();
  }

  onConfirmedActions(actions: FloatLicenseAction[]) {
    this.actions.setValue(actions);
    if (!!this.relatedLicenseWithAction) {
      this.relatedLicenseWithAction.length = 0;
    }
    actions.forEach((a) => {
      let licenseIndex = this.relatedLicense.findIndex(
        (l) => l.partNumber == a.partNumber
      );
      if (licenseIndex > -1) {
        this.relatedLicenseWithAction.push({
          license: this.relatedLicense[licenseIndex],
          action: a,
        });
      }
    });
    this.relatedLicenseWithAction = this.relatedLicenseWithAction.slice();
    this.stepper.next();
  }

  onConfirmedConflicts(conflicts) {
    let needConfirms = this.relatedLicenseWithAction;
    if (!!conflicts) {
      needConfirms = needConfirms.concat(conflicts);
    }
    this.conflicts.setValue(needConfirms);
    this.stepper.next();
  }

  onConfirmed(confirmed) {
    this.confirmed.setValue(confirmed);
    //todo use the licenseService to float
    this.stepper.next();
  }
}
