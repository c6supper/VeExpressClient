import { Component, Input, OnInit, Injector } from "@angular/core";
import { QDialogComponent } from "galaxy";
import { OeLicenseBundle } from "projects/VeExpress/src/app/core/data-source/models/oelicense-bundle";
import { OeLicenseInterface } from "projects/VeExpress/src/app/core/data-source/services/oelicense.interface";
import { OeModuleType } from "projects/VeExpress/src/app/core/data-source/models/oemodule-type";

@Component({
  selector: "bundle-selection",
  templateUrl: "bundle-selection.component.html",
  styleUrls: ["bundle-selection.component.scss"],
})
export class BundleSelectionComponent extends QDialogComponent
  implements OnInit {
  @Input() moduleType: OeModuleType;
  styles: string[] = ["primary", "success", "info", "warning", "danger"];
  bundles: OeLicenseBundle[];
  constructor(
    injector: Injector,
    private oeLicenseService: OeLicenseInterface
  ) {
    super(injector);
  }

  private initializeBundle(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oeLicenseService.getOeLicenseBundle(this.moduleType.id).then(
        (bs) => {
          this.bundles = bs;
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.registerLoader(this.initializeBundle());
    this.load();
  }

  onChangeBundle(bundleId: number) {
    this.submit(this.bundles.find((b) => b.id == bundleId));
  }
}
