import { Model } from "./model";
import { OeModuleType } from "./oemodule-type";

export interface OeLicense extends Model {
  partNumber: string;
  marketingDescription: string;
  moduleType?: OeModuleType;
  moduleTypeId: number;
}
