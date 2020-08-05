import { NbAlertModule } from "@nebular/theme";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [NbAlertModule],
  exports: [NbAlertModule]
})
export class QAlertModule extends NbAlertModule {}
