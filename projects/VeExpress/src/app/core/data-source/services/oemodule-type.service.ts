import { Injectable } from "@angular/core";
import { OeModuleType } from "../models/oemodule-type";
import { OeModuleTypeInterface } from "./oemodule-type.interface";
import { Observable, ReplaySubject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { QODataSourceService, QODataResponse } from "galaxy";
@Injectable({
  providedIn: "root"
})
export class OeModuleTypeService extends QODataSourceService
  implements OeModuleTypeInterface {
  private ready = new ReplaySubject<any>();
  private moduleTypes: OeModuleType[];

  onReady(): Observable<any> {
    return this.ready.asObservable();
  }

  private loadModuleTypes() {
    if (!!this.moduleTypes) {
      return;
    }

    let query = this.getODataQuery();
    query
      .entitySet("OeModuleType")
      .get()
      .subscribe(
        (odataResponse: QODataResponse) => {
          this.moduleTypes = odataResponse
            .toEntitySet<OeModuleType>()
            .getEntities();
          this.moduleTypes.forEach(
            type => (type.regExpSn = new RegExp(type.regExpSn))
          );
        },
        (error: string) => {
          console.log(error);
          this.moduleTypes = null;
        },
        () => {
          this.ready.next();
        }
      );
  }

  protected postponeInitialize() {
    super.postponeInitialize();
    this.loadModuleTypes();
  }

  getModuleType(serialNumber: string) {
    let moduleType: OeModuleType;
    return this.onReady().pipe(
      takeUntil(this.destroy$),
      map(_ => {
        this.moduleTypes.forEach(type => {
          if (type.regExpSn.test(serialNumber)) {
            moduleType = type;
          }
        });
        return moduleType;
      })
    );
  }
}
