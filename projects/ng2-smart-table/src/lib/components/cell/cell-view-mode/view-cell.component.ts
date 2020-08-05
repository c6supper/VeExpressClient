import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Cell } from "../../../lib/data-set/cell";

@Component({
  selector: "table-cell-view-mode",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="true">
      <custom-view-component
        *ngSwitchCase="cell.getColumn().type.startsWith('custom')"
        [cell]="cell"
      ></custom-view-component>
      <div
        *ngSwitchCase="cell.getColumn().type === 'html'"
        [innerHTML]="cell.getValue()"
      ></div>
      <div *ngSwitchDefault>{{ cell.getValue() }}</div>
    </div>
  `
})
export class ViewCellComponent {
  @Input() cell: Cell;
}
