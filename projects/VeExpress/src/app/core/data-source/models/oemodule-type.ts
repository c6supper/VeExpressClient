import { Model } from "./model";

export interface OeModuleType extends Model {
  name: string;
  regExpSn: RegExp;
  isChassis: boolean;
}
