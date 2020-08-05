import { Injectable } from "@angular/core";
import { OeModuleType } from "../data-source/models/oemodule-type";
import { OeModuleTypeInterface } from "../data-source/services/oemodule-type.interface";
import { of as observableOf } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class OeModuleTypeService extends OeModuleTypeInterface {
  onReady(): import("rxjs").Observable<any> {
    return observableOf(null);
  }
  private moduleTypes: Array<OeModuleType> = [
    {
      id: 1,
      name: "TX320s",
      regExpSn: RegExp("^\\w(TT|TW|T6)\\w+"),
      isChassis: true
    },
    {
      id: 2,
      name: "RXT-6200",
      regExpSn: RegExp("^\\wSN\\w+"),
      isChassis: false
    }
  ];

  getModuleTypes() {
    return observableOf(this.moduleTypes);
  }

  getModuleType(serialNumber: string) {
    let moduleType = observableOf(null);
    this.moduleTypes.every(type => {
      if (type.regExpSn.test(serialNumber)) {
        moduleType = observableOf(type);
        return false;
      }
    });
    return moduleType;
  }
}
