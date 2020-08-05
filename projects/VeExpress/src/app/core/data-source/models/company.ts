import { Model } from "./model";
import { Org } from "./org";

export interface Company extends Model {
  name: string;
  description: string;
  status: string;
  orgId: number;
  org?: Org;
}
