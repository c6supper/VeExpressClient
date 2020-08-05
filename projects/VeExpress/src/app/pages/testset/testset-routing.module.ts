import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SummaryComponent } from "./summary/summary.component";
import { ListComponent } from "./list/list.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "summary",
        component: SummaryComponent,
      },
      {
        path: "list",
        component: ListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestsetRoutingModule {}
