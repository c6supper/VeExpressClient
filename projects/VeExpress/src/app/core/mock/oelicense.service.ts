import { Injectable } from "@angular/core";
import { OeModuleTypeService } from "./oemodule-type.service";
import { OeLicenseInterface } from "../data-source/services/oelicense.interface";
import { of as observableOf } from "rxjs";
import { RelationType } from "../data-source/models/oelicense-relation";
import { OeModuleType } from "../data-source/models/oemodule-type";

@Injectable({
  providedIn: "root",
})
export class OeLicenseService extends OeLicenseInterface {
  getOeLicenseRelationsByModule(
    moduleTypeId: number
  ): Promise<
    import("../data-source/models/oelicense-relation").OeLicenseRelation[]
  > {
    throw new Error("Method not implemented.");
  }
  getOeLicenseBundleRelations(
    bundleId: number
  ): Promise<
    import("../data-source/models/oelicense-bundle-relation").OeLicenseBundleRelation[]
  > {
    throw new Error("Method not implemented.");
  }
  private getRelationMockData() {
    return [
      {
        id: 1,
        sourceLicense: {
          id: 1,
          partNumber: "499-05-050",
          marketingDescription: "DS1 (1.5Mbps) Pulse Mask Analysis",
          moduleTypeId: 1,
        },
        targetLicense: {
          id: 2,
          partNumber: "499-05-051",
          marketingDescription: "DS3(45Mbps) Pulse Mask Analysis",
          moduleTypeId: 1,
        },
        relationType: {
          id: 1,
          relationType: RelationType.Excluded,
          name: "Excluded",
          description: "",
        },
      },
      {
        id: 2,
        sourceLicense: {
          id: 1,
          partNumber: "499-05-050",
          marketingDescription: "DS1 (1.5Mbps) Pulse Mask Analysis",
          moduleTypeId: 1,
        },
        targetLicense: {
          id: 3,
          partNumber: "499-05-051",
          marketingDescription: "DS3(45Mbps) Pulse Mask Analysis",
          moduleTypeId: 1,
        },
        relationType: {
          id: 2,
          relationType: RelationType.RequireSingle,
          name: "Required",
          description: "",
        },
      },
      {
        id: 3,
        sourceLicense: {
          id: 1,
          partNumber: "499-05-050",
          marketingDescription: "DS1 (1.5Mbps) Pulse Mask Analysis",
          moduleTypeId: 1,
        },
        targetLicense: {
          id: 4,
          partNumber: "499-05-167",
          marketingDescription: "Fiber Scope Expert",
          moduleTypeId: 1,
        },
        relationType: {
          id: 2,
          relationType: RelationType.RequireSingle,
          name: "Required",
          description: "",
        },
      },
    ];
  }

  private getBundleMockData() {
    return [
      {
        id: 1,
        bundlePartNumber: "Z33-00-047",
        marketingDescription:
          "DS1 to OC-192 Testing, 64k Codir, VF and Pulse Mask Analysis",
        typeName: "S/W Options 1",
        moduleTypeId: 1,
      },
    ];
  }

  constructor(private oeModuleTypeService: OeModuleTypeService) {
    super();
  }

  getOeLicenseBundle(oeModuleTypeId: number) {
    return observableOf(
      this.getBundleMockData().filter((b) => b.moduleTypeId === oeModuleTypeId)
    ).toPromise();
  }

  getOeLicenseRelations(
    moduleTypeId: number,
    partNumber: string,
    relationType?: string
  ) {
    return observableOf(
      this.getRelationMockData().filter(
        (r) =>
          r.sourceLicense.moduleTypeId === moduleTypeId &&
          r.sourceLicense.partNumber === partNumber &&
          (!relationType || r.relationType.relationType === relationType)
      )
    ).toPromise();
  }
}
