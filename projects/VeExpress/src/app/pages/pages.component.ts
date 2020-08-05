import { Component, OnInit } from "@angular/core";

import { MENU_ITEMS } from "./pages-menu";
import { QSearchService } from "galaxy";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "veexpress-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <galaxy-one-column-layout>
      <card-menu [components]="menu"></card-menu>
      <router-outlet></router-outlet>
    </galaxy-one-column-layout>
  `,
})
export class VeExpressPagesComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor(
    private searchService: QSearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.searchService.onSearchSubmit().subscribe((search) => {
      if (!!search.tag && search.tag == "header") {
        this.router.navigate(["./testset/list"], {
          relativeTo: this.route,
          queryParams: search,
        });
      }
    });
  }
}
