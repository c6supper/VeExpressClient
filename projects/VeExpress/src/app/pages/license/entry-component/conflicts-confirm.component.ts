import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { QMobileComponent } from "galaxy";

@Component({
  selector: "conflicts-confirm-card",
  styleUrls: ["conflicts-confirm.component.scss"],
  templateUrl: "./conflicts-confirm.component.html",
})
export class ConflictsConfirmComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() selectedTestset: any;
  @Input() conflicts: Array<any>;
  @Input() partNumber: string;
  @Input() licenseDesc: string;
  @Output() confirmed = new EventEmitter<any>();

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
    const confirmed = this.conflicts.map((c) => c.action);
    this.confirmed.emit(confirmed);
    return false;
  }
}
