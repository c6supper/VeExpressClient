import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  QThemeService,
  QMediaBreakpointsService,
  QMobileComponent,
} from "galaxy";
import { ActivatedRoute, Router } from "@angular/router";
import { TestsetSourceService } from "../../../core/data-source/services/testset-source.service";
import { LicenseSourceService } from "../../../core/data-source/services/license-source.service";
import { FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
@Component({
  selector: "license-release-stepper",
  styleUrls: ["release-stepper.component.scss"],
  templateUrl: "./release-stepper.component.html",
})
export class ReleaseStepperComponent extends QMobileComponent
  implements OnInit, OnDestroy {
  companyId: number;
  testsetTypeId: number;
  testsetType: string;
  company: string;
  partNumber: string;
  licenseDesc: string;
  testsets: Array<any>;
  selectedTestset = new FormControl("", [Validators.required]);
  hasConflict = new FormControl("", [Validators.required]);
  released = new FormControl("", [Validators.required]);
  @ViewChild("stepper", { static: true }) stepper;

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private route: ActivatedRoute,
    private testsetService: TestsetSourceService,
    private licenseService: LicenseSourceService,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      this.companyId = params.companyId;
      this.testsetTypeId = params.testsetTypeId;
      this.partNumber = params.partNumber;
      this.licenseDesc = params.description;
      this.testsetService.onTypeChanged().subscribe((types) => {
        this.testsetType = types.find((t) => t.id == this.testsetTypeId).type;
      });
      this.licenseService
        .getLicenseRelatedTestsets(
          this.companyId,
          this.testsetTypeId,
          this.partNumber
        )
        .then((testsets) => {
          this.testsets = testsets;
        });
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.selectedTestset.reset();
  }

  onSelectTestset(testset: any) {
    this.selectedTestset.setValue(testset);
    this.stepper.next();
  }

  onResolved(relations: any) {
    this.hasConflict.setValue(relations);
    if (relations && relations.length < 1) {
      this.hasConflict.setErrors(null);
    }
    this.stepper.next();
  }

  onReleased(released: any) {
    this.released.setValue(released);
    this.stepper.next();
  }
}
