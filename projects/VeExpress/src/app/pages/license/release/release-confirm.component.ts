import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { QMobileComponent } from "galaxy";

@Component({
  selector: "release-confirm-card",
  styleUrls: ["release-confirm.component.scss"],
  templateUrl: "./release-confirm.component.html"
})
export class ReleaseConfirmComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() selectedTestset: any;
  @Input() conflicts: Array<any>;
  @Input() partNumber: string;
  @Input() licenseDesc: string;
  @Output() released = new EventEmitter<any>();

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges() {}

  onConfirmation(): Boolean {
    return false;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  mock() {
    return false;
  }

  onConfirm() {
    const released = this.conflicts.map(c => c.targetLicense);
    this.released.emit(released);
    return false;
  }
}
