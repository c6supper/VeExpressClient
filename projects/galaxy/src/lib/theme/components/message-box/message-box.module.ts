import { NgModule } from "@angular/core";
import { QDialogModule } from "../dialog/dialog.module";
import { QMessageBoxComponent } from "./message-box.component";
import { NbCardModule, NbButtonModule } from "@nebular/theme";

@NgModule({
  imports: [QDialogModule, NbCardModule, NbButtonModule],
  declarations: [QMessageBoxComponent],
  entryComponents: [QMessageBoxComponent]
})
export class QMessageBoxModule {}
