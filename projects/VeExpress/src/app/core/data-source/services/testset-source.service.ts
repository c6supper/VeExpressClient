import { QODataSourceService, QODataResponse } from "galaxy";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TestsetType } from "../models/testsettype";
import { Testset } from "../models/test-set";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TestsetSourceService extends QODataSourceService {
  private testsetTypes: TestsetType[] = null;
  private userName: string;
  private onTypeChangedSource = new BehaviorSubject<TestsetType[]>(null);

  isValid(): boolean {
    return super.isValid() && !!this.testsetTypes;
  }

  fuzzySearch(key: string) {
    if (!this.isValid())
      return new Promise<Testset[]>((resolve) => resolve(new Array<Testset>()));

    return this.getODataQuery("/api/v1/Testset")
      .entitySet("GetTestsets")
      .entityKey(`userName='${this.userName}',serialNumber='${key}'`)
      .expand("Company")
      .get()
      .pipe(
        map((odataResponse) => {
          return odataResponse.toEntitySet<Testset>().getEntities();
        })
      )
      .toPromise();
  }

  onTypeChanged(): Observable<TestsetType[]> {
    return this.onTypeChangedSource.asObservable();
  }

  emitOnTypeChanged(types: TestsetType[]) {
    this.onTypeChangedSource.next(types);
  }

  protected onTokenChange(_token): void {
    super.onTokenChange(_token);
    if (!!_token.payload) {
      this.userName = _token.payload.name;
    } else {
      this.userName = "";
    }
    let query = this.getODataQuery();
    query
      .entitySet("TestsetType")
      .get()
      .subscribe(
        (odataResponse: QODataResponse) => {
          this.testsetTypes = odataResponse
            .toEntitySet<TestsetType>()
            .getEntities();
          this.emitOnTypeChanged(this.testsetTypes);
        },
        (error: string) => {
          console.log(error);
        }
      );
  }
}
