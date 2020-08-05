import { Model } from "./model";

export interface Testset extends Model {
  companyId: string;
  connectedDateTime: string;
  cpuBarcode: string;
  mac: string;
  module1Barcode: string;
  module2Barcode: string;
  moduleType: string;
  serialNumber: string;
  status: string;
  testsetTypeId: number;
  version: string;
  company?: any;
}
