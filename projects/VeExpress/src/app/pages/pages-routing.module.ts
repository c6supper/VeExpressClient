import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VeExpressPagesComponent } from "./pages.component";
import { LicenseHistoryComponent } from "./history/license-history.component";

const routes: Routes = [
  {
    path: "",
    component: VeExpressPagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "testset",
        loadChildren: () =>
          import("./testset/testset.module").then((m) => m.TestsetModule),
      },
      {
        path: "license",
        loadChildren: () =>
          import("./license/license.module").then((m) => m.LicenseModule),
      },
      {
        path: "history",
        component: LicenseHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeExpressPagesRoutingModule {}
