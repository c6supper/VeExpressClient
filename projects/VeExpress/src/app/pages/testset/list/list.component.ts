import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  QThemeService,
  QMobileComponent,
  QMediaBreakpointsService,
} from "galaxy";
import { Testset } from "../../../core/data-source/models/test-set";
import { ActivatedRoute, Router } from "@angular/router";
import { TestsetSourceService } from "../../../core/data-source/services/testset-source.service";
import { Location } from "@angular/common";
@Component({
  selector: "testset-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent extends QMobileComponent
  implements OnInit, OnDestroy {
  testsets: Testset[] = new Array<Testset>();
  serialNumberKey: string;
  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private route: ActivatedRoute,
    private testsetService: TestsetSourceService,
    private router: Router,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.queryParams.subscribe((params) => {
      this.serialNumberKey = params["term"];
      this.registerLoader(this.listTestsets(this.serialNumberKey));
      this.load();
    });
  }

  private listTestsets(serialNumberKey: string) {
    return new Promise((resolve, reject) => {
      this.testsetService.onTypeChanged().subscribe(
        (_) => {
          if (!_) {
            return;
          }
          this.testsetService.fuzzySearch(serialNumberKey).then(
            (ts) => {
              this.testsets = ts;
              resolve();
            },
            (error) => reject(error)
          );
        },
        (error) => reject(error)
      );
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  float(testset: Testset): boolean {
    this.router.navigate(["../../license/float"], {
      relativeTo: this.route,
      queryParams: testset,
    });
    return false;
  }
}
