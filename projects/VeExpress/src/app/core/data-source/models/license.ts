import { Model } from "./model";

export enum LicenseStatus {
  Idle = "Idle",
  Activated = "Activated",
  Assigned = "Assigned",
  Releasing = "Releasing",
  Expired = "Expired",
  Removed = "Removed",
  Licensed = "Licensed",
  Scheduled = "Scheduled",
  NotPurchased = "NotPurchased"
}

export interface License extends Model {
  name: string;
  status: string;
  autoRenew: boolean;
  partNumber: string;
  companyId: number;
  testsetId: number;
  optionTypeId: number;
  leasedSeconds: number;
  testset?: any;
  optionType?: any;
}
