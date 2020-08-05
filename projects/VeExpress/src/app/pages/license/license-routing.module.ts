import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SummaryComponent } from "./summary/summary.component";
import { ReleaseStepperComponent } from "./release/release-stepper.component";
import { FloatStepperComponent } from "./float/float-stepper.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "summary",
        component: SummaryComponent
      },
      {
        path: "release",
        component: ReleaseStepperComponent
      },
      {
        path: "float",
        component: FloatStepperComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule {}
