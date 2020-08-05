import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { QCoreModule } from "galaxy";
import { VeExpressLayoutService } from "./utils/layout.service";
import { QSecurityModule } from "galaxy";
import { QAuthService } from "galaxy";
import { OrgSourceService } from "./data-source/services/org-source.service";
import { UserSourceService } from "./data-source/services/user-source.service";
import { HttpClientModule } from "@angular/common/http";
import { TestsetSourceService } from "./data-source/services/testset-source.service";
import { LicenseSourceService } from "./data-source/services/license-source.service";
import { OeLicenseInterface } from "./data-source/services/oelicense.interface";
import { OeModuleTypeInterface } from "./data-source/services/oemodule-type.interface";
import { OeLicenseService } from "./data-source/services/oelicense.service";
import { OeModuleTypeService } from "./data-source/services/oemodule-type.service";

export const VEEXPRESS_CORE_PROVIDERS = [
  QSecurityModule.forRoot({
    accessControl: {
      Viewer: {
        view: "*"
      },
      Manager: {
        parent: "Viewer",
        create: "*",
        edit: "*",
        remove: "*"
      }
    }
  }).providers
];

@NgModule({
  imports: [CommonModule, HttpClientModule, QCoreModule],
  exports: [QCoreModule],
  declarations: []
})
export class VeExpressCoreModule extends QCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: VeExpressCoreModule) {
    super(parentModule);
  }

  static forRoot(mock: boolean): ModuleWithProviders {
    return {
      ngModule: VeExpressCoreModule,
      providers: [
        ...VEEXPRESS_CORE_PROVIDERS,
        QCoreModule.layoutServiceProvider(VeExpressLayoutService),
        [QAuthService],
        [OrgSourceService],
        [UserSourceService],
        [TestsetSourceService],
        [LicenseSourceService],
        [OeLicenseService],
        [OeModuleTypeService],
        {
          provide: OeLicenseInterface,
          useExisting: OeLicenseService
        },
        {
          provide: OeModuleTypeInterface,
          useExisting: OeModuleTypeService
        }
      ]
    } as ModuleWithProviders;
  }
}
