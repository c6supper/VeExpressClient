import { QODataSourceService } from "galaxy";
import { Injectable } from "@angular/core";
import { License } from "../models/license";
import { map } from "rxjs/operators";
import { promise } from "protractor";

@Injectable({
  providedIn: "root"
})
export class LicenseSourceService extends QODataSourceService {
  getLicenseRelatedTestsets(
    companyId: number,
    testsetTypeId: number,
    partNumber: string
  ): Promise<any> {
    return this.getODataQuery()
      .entitySet("Option")
      .expand("Testset")
      .filter(
        `TestsetId ne null and CompanyId eq ${companyId} and TestsetTypeId eq ${testsetTypeId} and PartNumber eq '${partNumber}'`
      )
      .select("Testset")
      .get()
      .pipe(
        map(odataResponse => {
          return odataResponse
            .toEntitySet<License>()
            .getEntities()
            .map(license => {
              return license.testset;
            });
        })
      )
      .toPromise();
  }

  changeLicenses(licensesFloatInfo: any): Promise<any> {
    // const test = [
    //   { Action: "Release", PartNumber: "499-05-200", TestsetId: 1256 },
    //   { Action: "Assign", PartNumber: "499-05-017", TestsetId: 1256 }
    // ];
    const request = { parameterJson: JSON.stringify(licensesFloatInfo) };
    return this.getODataQuery("/api/v1/Option")
      .entitySet("ChangeOptions")
      .post(request)
      .toPromise();
  }

  getTestsetLicense(testsetId: number): Promise<any> {
    return this.getODataQuery()
      .entitySet("Option")
      .filter(`TestsetId ne null and TestsetId eq ${testsetId}`)
      .get()
      .pipe(
        map(odataResponse => {
          return odataResponse.toEntitySet<License>().getEntities();
        })
      )
      .toPromise();
  }

  getTestsetRelatedLicense(serialNumber: string): Promise<License[]> {
    return this.getODataQuery("/api/v1/Option")
      .entitySet("GetOptions")
      .entityKey(`serialNumber='${serialNumber}'`)
      .get()
      .pipe(
        map(odataResponse => {
          return odataResponse.toEntitySet<License>().getEntities();
        })
      )
      .toPromise();
  }
}
