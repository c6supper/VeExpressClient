import { Model } from "./model";

export interface Org extends Model {
  name: string;
  description: string;
  status: string;
  userId?: number;
}
