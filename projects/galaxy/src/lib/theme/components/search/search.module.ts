import { NbSearchModule, NbSearchService } from "@nebular/theme";
import { NgModule } from "@angular/core";
import { QSearchService } from "./search.service";

@NgModule({
  imports: [NbSearchModule],
  exports: [NbSearchModule],
  providers: [
    QSearchService,
    { provide: NbSearchService, useExisting: QSearchService },
  ],
})
export class QSearchModule extends NbSearchModule {}
