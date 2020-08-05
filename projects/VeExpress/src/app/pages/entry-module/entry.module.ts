import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrgScopeDialogComponent } from "./components/org-scope.component";
import { ProductOrgScopeComponent } from "./components/product-org-scope.component";
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
  QRadioModule,
  QBadgeModule,
  QSpinnerModule,
} from "galaxy";
import { QTooltipModule } from "projects/galaxy/src/lib/theme/components/tooltip/tooltip.module";
import { BundleSelectionComponent } from "./components/bundle/bundle-selection.component";

@NgModule({
  declarations: [
    OrgScopeDialogComponent,
    ProductOrgScopeComponent,
    BundleSelectionComponent,
  ],
  imports: [
    CommonModule,
    QTranslateModule.forChild(),
    QCardModule,
    QButtonModule,
    QInputModule,
    QIconModule,
    QSmartTableModule,
    QActionsModule,
    QDialogModule,
    QSelectModule,
    QStepperModule,
    QTooltipModule,
    QRadioModule,
    QBadgeModule,
    QSpinnerModule,
  ],
  exports: [
    OrgScopeDialogComponent,
    ProductOrgScopeComponent,
    BundleSelectionComponent,
  ],
  entryComponents: [
    OrgScopeDialogComponent,
    ProductOrgScopeComponent,
    BundleSelectionComponent,
  ],
})
export class entryModule {}
