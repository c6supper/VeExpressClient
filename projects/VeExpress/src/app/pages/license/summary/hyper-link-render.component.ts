import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  template: `
    <div [ngSwitch]="true">
      <a
        nbTooltip="{{
          'app.pages.license.summary.assignedhyperlinkrender.floatinglicense'
            | translate
        }}"
        nbTooltipStatus="warning"
        class="hyperLink"
        *ngSwitchCase="renderValue !== '0' && columnId === 'assigned'"
        href="#!"
        (click)="release()"
        >{{ renderValue }}
        <nb-icon
          (click)="release()"
          icon="share-outline"
          [options]="{ animation: { type: 'zoom' } }"
        ></nb-icon
      ></a>
      <!-- <a
        nbTooltip="{{
          'app.pages.license.summary.availablehyperlinkrender.floatinglicense'
            | translate
        }}"
        nbTooltipStatus="warning"
        class="hyperLink"
        *ngSwitchCase="renderValue !== '0' && columnId === 'available'"
        href="#!"
        (click)="jump()"
        >{{ renderValue }}
        <nb-icon
          (click)="jump()"
          icon="share-outline"
          [options]="{ animation: { type: 'zoom' } }"
        ></nb-icon
      ></a> -->
      <div *ngSwitchDefault>{{ renderValue }}</div>
    </div>
  `,
  styles: [
    `
      .hyperLink {
        font-size: 1.25em;
        font-weight: bold;
      }
    `,
  ],
})
export class HyperLinkRenderComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Input() columnId: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  jump() {
    return false;
  }

  release(): boolean {
    this.router.navigate(["../release"], {
      relativeTo: this.route,
      queryParams: this.rowData,
    });
    return false;
  }
}
