import { ModuleWithProviders, NgModule } from "@angular/core";
import { OeLicenseService } from "./oelicense.service";
import { OeModuleTypeService } from "./oemodule-type.service";
import { OeLicenseInterface } from "../data-source/services/oelicense.interface";
import { OeModuleTypeInterface } from "../data-source/services/oemodule-type.interface";

@NgModule({})
export class VeExpressMockModule {
  static forRoot(mock: boolean): ModuleWithProviders {
    let moduleProviders = {
      ngModule: VeExpressMockModule,
      providers: [
        { provide: OeLicenseInterface, useClass: OeLicenseService },
        { provide: OeModuleTypeInterface, useClass: OeModuleTypeService }
      ]
    } as ModuleWithProviders;

    if (!mock) {
      moduleProviders.providers = [];
    }
    return moduleProviders;
  }
}
