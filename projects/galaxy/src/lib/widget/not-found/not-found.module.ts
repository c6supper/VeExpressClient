import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QNotFoundComponent } from "./components/not-found.component";
import { QCardModule } from "../../theme/components/card/card.module";
import { QButtonModule } from "../../theme/components/button/button.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule
} from "@nebular/theme";
import { QTranslateModule } from "../../i18n/translate.module";

@NgModule({
  declarations: [QNotFoundComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NbIconModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    QCardModule,
    QButtonModule,
    NbCheckboxModule,
    QTranslateModule.forChild()
  ],
  exports: [QNotFoundComponent, QCardModule, QButtonModule, NbLayoutModule]
})
export class QNotFoundModule {}
