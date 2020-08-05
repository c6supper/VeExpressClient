import { Model } from "./model";
import { OeLicense } from "./oelicense";
import { OeLicenseBundle } from "./oelicense-bundle";

export interface OeLicenseBundleRelation extends Model {
  oeLicenseBundleId: number;
  oeLicenseId: number;
  oeLicense?: OeLicense;
  oeLicenseBundle?: OeLicenseBundle;
}
