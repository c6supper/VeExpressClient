import { NbBadgeModule } from "@nebular/theme";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [NbBadgeModule],
  exports: [NbBadgeModule]
})
export class QBadgeModule extends NbBadgeModule {}
