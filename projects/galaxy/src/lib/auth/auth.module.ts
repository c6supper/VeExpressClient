import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { QAuthRoutingModule } from "./auth-routing.module";
import {
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule
} from "@nebular/theme";
import {
  NbAuthModule,
  NbAuthService,
  NbPasswordAuthStrategy,
  NbTokenService
} from "@nebular/auth";
import { QLoginComponent } from "./components/login/login.component";
import { QAuthStrategy } from "./strategies/password-strategy";
import { QAuthComponent } from "./components/auth/auth.component";
import { QAuthService } from "./services/auth.service";
import { QButtonModule } from "../theme/components/button/button.module";
import { QCardModule } from "../theme/components/card/card.module";
import { QTokenService } from "./services/token/token.service";
import { QTranslateModule } from "../i18n/translate.module";

@NgModule({
  declarations: [QLoginComponent, QAuthComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NbIconModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,
    QButtonModule,
    QCardModule,
    NbCheckboxModule,
    QAuthRoutingModule,
    NbAuthModule,
    QTranslateModule.forChild()
  ],
  exports: [NbAuthModule]
})
export class QAuthModule extends NbAuthModule {
  static forRoot(authOptions?: any): ModuleWithProviders {
    return {
      ngModule: QAuthModule,
      providers: [
        NbAuthModule.forRoot(authOptions).providers,
        QAuthStrategy,
        { provide: NbPasswordAuthStrategy, useExisting: QAuthStrategy },
        QAuthService,
        { provide: NbAuthService, useExisting: QAuthService },
        QTokenService,
        { provide: NbTokenService, useExisting: QTokenService }
      ]
    } as ModuleWithProviders;
  }
}
