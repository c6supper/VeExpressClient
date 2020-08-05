import { QODataSourceService, QODataResponse } from "galaxy";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/user";
import { Company } from "../models/company";

@Injectable({
  providedIn: "root"
})
export class UserSourceService extends QODataSourceService {
  // private user: User = null;
  private onChangedCompanies = new BehaviorSubject<Company[]>(null);
  protected onChangedUser = new BehaviorSubject<User>(null);

  onUserCompaniesChanged(): Observable<Company[]> {
    return this.onChangedCompanies.asObservable();
  }

  onUserChanged(): Observable<any> {
    return this.onChangedUser.asObservable();
  }

  isValid(): boolean {
    return super.isValid() && !!this.onChangedUser.getValue();
  }

  private getCompanyByUser(user: User) {
    this.onChangedCompanies.next(null);
    let query = this.getODataQuery("/api/v1/User");
    query
      .entitySet("GetCompaniesByUser")
      .entityKey(`name='${user.name}'`)
      .expand("Org")
      .get()
      .subscribe(
        (odataResponse: QODataResponse) => {
          this.onChangedCompanies.next(
            odataResponse.toEntitySet<any>().getEntities()
          );
        },
        (error: string) => {
          console.log(error);
        }
      );
  }

  protected postponeInitialize() {
    super.postponeInitialize();
    this.onUserChanged().subscribe(u => {
      if (!!u) {
        this.getCompanyByUser(u);
      }
    });
  }

  protected onTokenChange(token): void {
    super.onTokenChange(token);
    this.onChangedUser.next(null);
    if (!!token && token.isValid()) {
      const userName = token.getUser().name;
      let query = this.getODataQuery();
      query
        .entitySet("User")
        .filter(`Name eq '${userName}'` as string)
        .get()
        .subscribe(
          (odataResponse: QODataResponse) => {
            const userEntities = odataResponse
              .toEntitySet<User>()
              .getEntities();
            this.onChangedUser.next(
              userEntities.length > 0 ? userEntities.pop() : null
            );
          },
          (error: string) => {
            console.log(error);
          }
        );
    }
  }
}
