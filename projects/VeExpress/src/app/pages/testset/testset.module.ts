import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  QSmartTableModule,
  QTranslateModule,
  QActionsModule,
  QCardModule,
  QButtonModule,
  QInputModule,
  QIconModule,
  QDialogModule,
  QSelectModule,
  QTooltipModule,
  QPopoverModule,
  QRadioModule,
  QBadgeModule,
  QAlertModule,
  QSpinnerModule,
} from "galaxy";
import { SummaryComponent } from "./summary/summary.component";
import { TestsetRoutingModule } from "./testset-routing.module";
import { entryModule } from "../entry-module/entry.module";
import { HyperLinkRenderComponent } from "./summary/hyper-link-render.component";
import { ListComponent } from "./list/list.component";

const COMPONENTS = [SummaryComponent, HyperLinkRenderComponent, ListComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    QSmartTableModule,
    QActionsModule,
    QTranslateModule.forChild(),
    QCardModule,
    QButtonModule,
    QInputModule,
    QIconModule,
    QDialogModule.forChild(),
    QSelectModule,
    TestsetRoutingModule,
    entryModule,
    QTooltipModule,
    QPopoverModule,
    QRadioModule,
    QBadgeModule,
    QAlertModule,
    QSpinnerModule,
  ],
  entryComponents: [HyperLinkRenderComponent],
})
export class TestsetModule {}
