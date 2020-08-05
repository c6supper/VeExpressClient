import { Injectable } from "@angular/core";
import { OeModuleTypeService } from "./oemodule-type.service";
import { OeLicenseInterface } from "./oelicense.interface";

import { OeLicenseRelation, RelationType } from "../models/oelicense-relation";
import {
  QODataSourceService,
  QAuthService,
  QODataService,
  QODataResponse,
} from "galaxy";
import { OeLicenseBundle } from "../models/oelicense-bundle";
import { map, takeUntil, switchMap } from "rxjs/operators";
import { OeLicenseBundleRelation } from "../models/oelicense-bundle-relation";

@Injectable({
  providedIn: "root",
})
export class OeLicenseService extends QODataSourceService
  implements OeLicenseInterface {
  constructor(
    authService: QAuthService,
    odataService: QODataService,
    private oeModuleTypeService: OeModuleTypeService
  ) {
    super(authService, odataService);
  }

  getOeLicenseRelationsByModule(
    moduleTypeId: number
  ): Promise<OeLicenseRelation[]> {
    return this.getODataQuery()
      .entitySet("OeLicenseRelation")
      .expand("sourceLicense,targetLicense,relationType")
      .filter(`sourceLicense/moduleTypeId eq ${moduleTypeId}`)
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((odataResponse: QODataResponse) => {
          return odataResponse.toEntitySet<OeLicenseRelation>().getEntities();
        })
      )
      .toPromise();
  }

  getOeLicenseBundleRelations(
    bundleId: number
  ): Promise<OeLicenseBundleRelation[]> {
    return this.getODataQuery()
      .entitySet("OeBundleLicenseRelation")
      .expand("OeLicenseBundle,OeLicense")
      .filter(`OeLicenseBundleId ne null and OeLicenseBundleId eq ${bundleId}`)
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((odataResponse: QODataResponse) => {
          return odataResponse
            .toEntitySet<OeLicenseBundleRelation>()
            .getEntities();
        })
      )
      .toPromise();
  }

  getOeLicenseBundle(oeModuleTypeId: number) {
    return this.getODataQuery()
      .entitySet("OeLicenseBundle")
      .filter(`ModuleTypeId ne null and ModuleTypeId eq ${oeModuleTypeId}`)
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((odataResponse: QODataResponse) => {
          return odataResponse.toEntitySet<OeLicenseBundle>().getEntities();
        })
      )
      .toPromise();
  }

  getOeLicenseRelations(
    moduleTypeId: number,
    partNumber: string,
    relationType: RelationType
  ): Promise<OeLicenseRelation[]> {
    return this.getODataQuery()
      .entitySet("OeLicenseRelation")
      .expand("sourceLicense,targetLicense,relationType")
      .filter(
        `sourceLicense/moduleTypeId eq ${moduleTypeId} and sourceLicense/partNumber eq '${partNumber}' and relationType/relationType eq '${relationType}'`
      )
      .get()
      .pipe(
        takeUntil(this.destroy$),
        map((odataResponse: QODataResponse) => {
          return odataResponse.toEntitySet<OeLicenseRelation>().getEntities();
        })
      )
      .toPromise();
  }
}
