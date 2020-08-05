import { NbPopoverModule } from "@nebular/theme";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [NbPopoverModule],
  exports: [NbPopoverModule],
  declarations: []
})
export class QPopoverModule extends NbPopoverModule {}
