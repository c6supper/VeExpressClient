import { Component, Input, Injector } from "@angular/core";
import { QDialogComponent } from "../dialog/dialog.component";
import { QTranslateService } from "../../../i18n/services/translate.service";

@Component({
  selector: "message-box",
  styleUrls: ["./message-box.component.scss"],
  templateUrl: "./message-box.component.html"
})
export class QMessageBoxComponent extends QDialogComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() submitDescription: string;
  @Input() cancelDescription: string;

  constructor(private translateService: QTranslateService, injector: Injector) {
    super(injector);

    this.translateService.get("app.generic.cancel").subscribe(res => {
      this.cancelDescription = res;
    });

    this.translateService.get("app.generic.confirm").subscribe(res => {
      this.submitDescription = res;
    });
  }
}
