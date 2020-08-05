import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbSidebarService,
  NbThemeService,
  NbMenuService,
} from "@nebular/theme";
import { Router } from "@angular/router";
import { QLayoutService } from "../../../core/utils/layout.service";
import { map, takeUntil, filter } from "rxjs/operators";
import { Subject } from "rxjs";
import { QAuthService } from "../../../auth/services/auth.service";
import { QAuthJWTToken } from "../../../auth/services/token/token";
import { QThemeService } from "../../services/theme.service";
import { QMediaBreakpointsService } from "../../services/breakpoints.service";

@Component({
  selector: "galaxy-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  user: any;

  themes = [
    {
      value: "galaxy-day",
      name: "Day",
    },
    {
      value: "galaxy-night",
      name: "Night",
    },
  ];

  currentTheme = "galaxy-day";

  userMenu = [{ title: "Profile" }, { title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: QThemeService,
    private layoutService: QLayoutService,
    private breakpointService: QMediaBreakpointsService,
    private authService: QAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: QAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getUser(); // here we receive a payload from the token and assigns it to our `user` variable
        }
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "user-menu-tag"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === "Log out") {
          this.router.navigate(["auth/logout"]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
