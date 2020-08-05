import { NgModule } from "@angular/core";
import { NbCardModule } from "@nebular/theme";

@NgModule({
  imports: [NbCardModule],
  exports: [NbCardModule]
})
export class QCardModule extends NbCardModule {}
