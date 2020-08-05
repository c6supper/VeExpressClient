import { Model } from "./model";
import { OeLicense } from "./oelicense";

export enum RelationType {
  Excluded = "Excluded",
  RequireSingle = "RequireSingle",
}

export interface OeLicenseRelationType extends Model {
  relationType: RelationType;
  name: string;
  description: string;
}

export interface OeLicenseRelation extends Model {
  sourceLicense: OeLicense;
  targetLicense: OeLicense;
  relationType: OeLicenseRelationType;
}
