import { NbSpinnerModule } from "@nebular/theme";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [NbSpinnerModule, CommonModule],
  exports: [NbSpinnerModule]
})
export class QSpinnerModule extends NbSpinnerModule {}
