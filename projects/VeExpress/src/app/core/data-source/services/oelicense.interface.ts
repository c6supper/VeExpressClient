import { OeLicenseRelation } from "../models/oelicense-relation";
import { OeLicenseBundle } from "../models/oelicense-bundle";
import { OeLicenseBundleRelation } from "../models/oelicense-bundle-relation";

export abstract class OeLicenseInterface {
  abstract getOeLicenseRelations(
    moduleTypeId: number,
    partNumber: string,
    relationType?: string
  ): Promise<OeLicenseRelation[]>;
  abstract getOeLicenseRelationsByModule(
    moduleTypeId: number
  ): Promise<OeLicenseRelation[]>;
  abstract getOeLicenseBundleRelations(
    bundleId: number
  ): Promise<OeLicenseBundleRelation[]>;
  abstract getOeLicenseBundle(
    oeModuleTypeId: number
  ): Promise<OeLicenseBundle[]>;
}
