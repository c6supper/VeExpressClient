import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  NbActionsModule,
  NbLayoutModule,
  NbUserModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbThemeService,
  NbMediaBreakpointsService,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { TinyMCEComponent } from "./components/tiny-mce/tiny-mce.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { OneColumnLayoutComponent } from "./layouts/one-column/one-column.layout";
import { QButtonModule } from "./components/button/button.module";
import { QSidebarModule } from "./components/sidebar/sidebar.module";
import { QContextMenuModule } from "./components/context-menu/context-menu.module";
import { QMenuModule } from "./components/menu/menu.module";
import { QSecurityModule } from "../security/security.module";
import { QCardMenuComponent } from "./components/card-menu/components/card-menu.component";
import { QCardModule } from "./components/card/card.module";
import { RouterModule } from "@angular/router";
import { QTranslateModule } from "../i18n/translate.module";
import { QThemeService } from "./services/theme.service";
import { QMediaBreakpointsService } from "./services/breakpoints.service";
import { QSpinnerModule } from "./components/spinner/spinner.module";
import { QSearchModule } from "./components/search/search.module";

const NB_MODULES = [
  NbLayoutModule,
  QMenuModule,
  NbUserModule,
  NbActionsModule,
  QSidebarModule,
  QContextMenuModule,
  QSecurityModule,
  QButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  QCardModule,
  QSpinnerModule,
  QSearchModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  QCardMenuComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbThemeModule,
    ...NB_MODULES,
    QTranslateModule.forChild(),
  ],
  exports: [CommonModule, RouterModule, NbThemeModule, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class QThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: QThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: "galaxy-day",
          }
          // [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
        QMediaBreakpointsService,
        QThemeService,
        { provide: NbThemeService, useExisting: QThemeService },
        {
          provide: NbMediaBreakpointsService,
          useExisting: QMediaBreakpointsService,
        },
      ],
    } as ModuleWithProviders;
  }
}
