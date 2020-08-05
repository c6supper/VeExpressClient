import { QODataSourceService, QODataResponse } from "galaxy";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/user";
import { Company } from "../models/company";
import { TestsetType } from '../models/testsettype';

@Injectable({
  providedIn: "root"
})
export class LocalUserSourceService extends QODataSourceService {
  private companyChanged = new BehaviorSubject<Company>(null);
  private testsetTypeChanged = new BehaviorSubject<number>(null);

  isValid(): boolean {
    return super.isValid() && !!this.testsetTypeChanged && !!this.companyChanged.getValue();
  }

  onCompanyChanged(company: any) {
    if (this.companyChanged.value != company) {
      this.companyChanged.next(company);
    }
  }

  onTestsetTypeChanged(type: number) {
    if (this.testsetTypeChanged.value != type) {
      this.testsetTypeChanged.next(type);
    }
  }

  CompanyChanged(): Observable<any> {
    return this.companyChanged.asObservable();
  }

  TestsetTypeChanged(): Observable<any> {
    return this.testsetTypeChanged.asObservable();
  }

  protected onTokenChange(token): void {
    super.onTokenChange(token);

    this.testsetTypeChanged.next(null);
    this.companyChanged.next(null);
  }


}
