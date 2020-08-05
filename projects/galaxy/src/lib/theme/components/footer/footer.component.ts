import { Component } from "@angular/core";

@Component({
  selector: "galaxy-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <span class="created-by"
      >Copyright © 2019 - 2020 VeEX Inc. All rights reserved</span
    >
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `
})
export class FooterComponent {}
