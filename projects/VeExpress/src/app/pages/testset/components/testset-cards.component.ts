import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  QMobileComponent,
  QDialogService,
  QMediaBreakpointsService,
  QThemeService,
  QTranslateService,
} from "galaxy";
import { LocalDataSource } from "ng2-smart-table";
import { QMessageBoxComponent } from "projects/galaxy/src/lib/theme/components/message-box/message-box.component";
import { Location } from "@angular/common";

@Component({
  selector: "veexpress-testset-cards",
  styleUrls: ["testset-cards.component.scss"],
  templateUrl: "./testset-cards.component.html",
})
export class TestsetCardsComponent extends QMobileComponent
  implements OnInit, OnDestroy, OnChanges {
  @Input() testsets: Array<any>;
  @Input() partNumber: string;
  @Input() testsetType: string;
  @Output() selectedTestset = new EventEmitter<any>();

  private source: LocalDataSource = null;
  settings = {
    actions: {
      columnTitle: "",
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: "left", // left|right
    },
    columns: {
      serialNumber: {
        title: "Serial Number",
      },
      connectedDateTime: {
        title: "Last seen",
        type: "datetime",
      },
    },
    pager: {
      display: true,
      perPage: 6,
    },
  };

  constructor(
    themeService: QThemeService,
    breakpointService: QMediaBreakpointsService,
    private dialogService: QDialogService,
    private translateService: QTranslateService,
    location: Location
  ) {
    super(themeService, breakpointService, location);
  }

  ngOnInit() {
    super.ngOnInit();
    this.source = new LocalDataSource(this.testsets);
  }

  ngOnChanges() {
    if (!!this.testsets) {
      this.source.load(this.testsets);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  mock() {
    return false;
  }

  rowSelect(row: any) {
    this.dialogService
      .open(QMessageBoxComponent, {
        context: {
          title: this.translateService.instant("app.generic.warning"),
          submitDescription: this.translateService.instant(
            "app.generic.confirm"
          ),
          cancelDescription: this.translateService.instant(
            "app.generic.cancel"
          ),
          message: this.translateService.instant(
            "app.pages.license.generic.release-warning",
            {
              partNumber: this.partNumber,
              serialNumber: row.data.serialNumber,
            }
          ),
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((confirmation) => {
        if (!!confirmation) {
          this.selectedTestset.emit(row.data);
        }
      });
  }
}
