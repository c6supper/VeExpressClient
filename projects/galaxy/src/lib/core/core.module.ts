import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbAuthModule } from "@nebular/auth";
import { throwIfAlreadyLoaded } from "./module-import-guard";
import { QLayoutService } from "./utils/layout.service";
import { ODataModule } from "odata-v4-ng";
import { QODataService } from "./data-source/services/odata-service";

@NgModule({
  imports: [CommonModule, ODataModule],
  exports: [NbAuthModule],
  declarations: [],
  providers: [QODataService]
})
export class QCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: QCoreModule) {
    throwIfAlreadyLoaded(parentModule, "QCoreModule");
  }

  static layoutServiceProvider(provider) {
    return { provide: QLayoutService, useClass: provider };
  }
}
