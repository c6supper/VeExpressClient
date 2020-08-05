import { LicenseHistoryActionEnum } from "./license-history";

export interface FloatLicenseAction {
  action: LicenseHistoryActionEnum;
  partNumber: string;
  testsetId: number;
}
