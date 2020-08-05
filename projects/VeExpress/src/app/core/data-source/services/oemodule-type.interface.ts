import { OeModuleType } from "../models/oemodule-type";
import { Observable } from "rxjs";

export abstract class OeModuleTypeInterface {
  abstract getModuleType(serialNumber: string): Observable<OeModuleType>;
  abstract onReady(): Observable<any>;
}
