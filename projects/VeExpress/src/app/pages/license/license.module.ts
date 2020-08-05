import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LicenseRoutingModule } from "./license-routing.module";
import { SummaryComponent } from "./summary/summary.component";
import {
  QTranslateModule,
  QCardModule,
  QButtonModule,
  QInputModule,
  QIconModule,
  QSmartTableModule,
  QActionsModule,
  QDialogModule,
  QSelectModule,
  QStepperModule,
  QAlertModule,
  QBadgeModule,
  QMessageBoxModule,
  QSpinnerModule,
  QPopoverModule,
  QRadioModule,
} from "galaxy";
import { CommonModule } from "@angular/common";
import { HyperLinkRenderComponent } from "./summary/hyper-link-render.component";
import { QTooltipModule } from "galaxy";
import { ReleaseStepperComponent } from "./release/release-stepper.component";
import { TestsetCardsComponent } from "../testset/components/testset-cards.component";
import { ReleaseConflictComponent } from "./release/release-conflict.component";
import { ReleaseConfirmComponent } from "./release/release-confirm.component";
import { entryModule } from "../entry-module/entry.module";
import { FloatStepperComponent } from "./float/float-stepper.component";
import { FloatConfirmComponent } from "./float/float-confirm.component";
import { LicenseCardComponent } from "./entry-component/license-card.component";
import { ResolveConflictComponent } from "./float/resolve-conflicts.component";
import { ConflictsConfirmComponent } from "./entry-component/conflicts-confirm.component";

const COMPONENTS = [
  SummaryComponent,
  HyperLinkRenderComponent,
  ReleaseStepperComponent,
  TestsetCardsComponent,
  ReleaseConflictComponent,
  ReleaseConfirmComponent,
  FloatStepperComponent,
  FloatConfirmComponent,
  LicenseCardComponent,
  ResolveConflictComponent,
  ConflictsConfirmComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    QCardModule,
    LicenseRoutingModule,
    QSmartTableModule,
    QButtonModule,
    QInputModule,
    QIconModule,
    QActionsModule,
    QTranslateModule.forChild(),
    QDialogModule.forChild(),
    CommonModule,
    QSelectModule,
    QTooltipModule,
    QStepperModule,
    FormsModule,
    QAlertModule,
    QBadgeModule,
    QMessageBoxModule,
    QSpinnerModule,
    entryModule,
    QPopoverModule,
    QRadioModule,
  ],
  entryComponents: [
    HyperLinkRenderComponent,
    TestsetCardsComponent,
    ReleaseConflictComponent,
    ReleaseConfirmComponent,
    FloatConfirmComponent,
    LicenseCardComponent,
    ResolveConflictComponent,
    ConflictsConfirmComponent,
  ],
})
export class LicenseModule {}
