import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  template: `
    <a
      nbTooltip="{{ 'app.pages.testset.summary.float-license' | translate }}"
      nbTooltipStatus="warning"
      class="hyperLink"
      href="#!"
      (click)="transfer()"
      >{{ renderValue }}
      <nb-icon
        (click)="transfer()"
        icon="checkmark-circle-outline"
        [options]="{ animation: { type: 'shake' } }"
      ></nb-icon
    ></a>
  `,
  styles: [
    `
      .hyperLink {
        font-size: 1em;
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

  transfer(): boolean {
    this.router.navigate(["../../license/float"], {
      relativeTo: this.route,
      queryParams: this.rowData,
    });
    return false;
  }
}
