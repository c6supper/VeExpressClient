import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardModule } from "./dashboard/dashboard.module";
import { VeExpressPagesRoutingModule } from "./pages-routing.module";
import { VeExpressPagesComponent } from "./pages.component";
import { QThemeModule } from "galaxy";
import { LicenseHistoryComponent } from "./history/license-history.component";

const COMPONENTS = [VeExpressPagesComponent, LicenseHistoryComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    VeExpressPagesRoutingModule,
    DashboardModule,
    QThemeModule,
    // VeEXMenuModule.forRoot()
  ],
  exports: [...COMPONENTS],
})
export class VeExpressPagesModule {}
