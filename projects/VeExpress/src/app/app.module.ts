import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { VeExpressThemeModule } from "./theme/theme.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VeExpressAuthModule } from "./auth/auth.module";
import { VeExpressPagesModule } from "./pages/pages.module";
import { VeExpressNotFoundComponent } from "./pages/miscellaneous/not-found/not-found.component";
import { QMenuService } from "galaxy";
import { QNotFoundModule } from "galaxy";
import { QSidebarModule } from "galaxy";
import { QMenuModule } from "galaxy";
import { VeExpressCoreModule } from "./core/core.module";
import { VeExpressAuthGuard } from "./auth-guard.service";
import { VeExpressSecurityModule } from "./security/security.module";
import { QTranslateModule } from "galaxy";
import { QDialogModule } from "galaxy";
import { environment } from "../../../galaxy/src/lib/environments/environment";
import { VeExpressMockModule } from "./core/mock/mock.module";

@NgModule({
  declarations: [AppComponent, VeExpressNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    VeExpressThemeModule.forRoot(),
    VeExpressAuthModule,
    VeExpressAuthModule.forRoot(),
    VeExpressPagesModule,
    QNotFoundModule,
    QMenuModule.forRoot(),
    QSidebarModule.forRoot(),
    VeExpressCoreModule.forRoot(environment.mock),
    VeExpressMockModule.forRoot(environment.mock),
    VeExpressSecurityModule.forRoot(),
    QTranslateModule.forRoot(),
    QDialogModule.forRoot(),
    FormsModule,
  ],
  providers: [QMenuService, VeExpressAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
