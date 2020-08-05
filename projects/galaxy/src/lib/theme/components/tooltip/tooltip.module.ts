import { NgModule } from "@angular/core";
import { NbTooltipModule } from "@nebular/theme";

@NgModule({
  imports: [NbTooltipModule],
  exports: [NbTooltipModule]
})
export class QTooltipModule extends NbTooltipModule {}
