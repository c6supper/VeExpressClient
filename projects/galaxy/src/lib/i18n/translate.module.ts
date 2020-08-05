import { ModuleWithProviders, NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModuleConfig } from "@ngx-translate/core/public_api";
import { QTranslateService } from "./services/translate.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/");
}

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [TranslateModule],
  providers: [
    QTranslateService,
    { provide: TranslateService, useExisting: QTranslateService }
  ]
})
export class QTranslateModule extends TranslateModule {
  static forRoot(config?: TranslateModuleConfig): ModuleWithProviders {
    if (!config) {
      config = {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      };
    }

    return <ModuleWithProviders>{
      ngModule: QTranslateModule,
      providers: [
        TranslateModule.forRoot(config).providers,
        QTranslateService,
        { provide: TranslateService, useExisting: QTranslateService }
      ]
    };
  }

  static forChild(config?: TranslateModuleConfig): ModuleWithProviders {
    if (config) {
      return TranslateModule.forChild(config);
    } else {
      return TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        isolate: false
      });
    }
  }
}
