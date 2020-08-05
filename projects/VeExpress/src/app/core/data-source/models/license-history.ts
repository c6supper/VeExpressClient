import { Model } from "./model";

export enum LicenseHistoryActionEnum {
  Delete = "Delete",
  Release = "Release",
  Remove = "Remove",
  Assign = "Assign",
  Activate = "Activate",
  Swap = "Swap",
  License = "License",
  Schedule = "Schedule",
  Releasing = "Releasing",
  Cancel = "Cancel",
  Unknown = "Unknown"
}

export interface LicenseHistory extends Model {}
