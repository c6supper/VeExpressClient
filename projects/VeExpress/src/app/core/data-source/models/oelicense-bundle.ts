import { Model } from "./model";
import { OeModuleType } from "./oemodule-type";

export interface OeLicenseBundle extends Model {
  bundlePartNumber: string;
  marketingDescription: string;
  typeName: string;
  moduleType?: OeModuleType;
  moduleTypeId: number;
}
