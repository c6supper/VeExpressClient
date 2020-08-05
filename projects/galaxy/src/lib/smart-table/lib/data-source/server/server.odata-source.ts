import { ServerDataSource } from "ng2-smart-table";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ServerSourceConf } from "../../../../../../../ng2-smart-table/src/lib/lib/data-source/server/server-source.conf";
import { isNumeric } from "rxjs/util/isNumeric";
import { Observable, observable } from "rxjs";

// todo need to use the odatav4 client
export class QServerODataSource extends ServerDataSource {
  endPointParas: any;

  constructor(
    protected http: HttpClient,
    conf: ServerSourceConf | {} = {},
    paras?: any,
    customHttpParas?: HttpParams
  ) {
    super(http, conf, customHttpParas);
    this.endPointParas = paras;
  }

  /**
   * Extracts total rows count from the server response
   * Looks for the count in the heders first, then in the response body
   * @param res
   * @returns {any}
   */
  protected extractTotalFromResponse(res: any): number {
    if (res.headers.has(this.conf.totalKey)) {
      return +res.headers.get(this.conf.totalKey);
    } else {
      const rawData = res.body;
      return !!rawData[this.conf.totalKey] ? rawData[this.conf.totalKey] : 0;
    }
  }

  protected addPagerRequestParams(httpParams: HttpParams): HttpParams {
    if (this.pagingConf && this.pagingConf.page && this.pagingConf.perPage) {
      const pageIdx: number = this.pagingConf.page;
      const pageLimit: number = this.pagingConf.perPage;
      const skip: number = (pageIdx - 1) * pageLimit;
      httpParams = httpParams.set("$top", pageLimit.toString());
      httpParams = httpParams.set("$skip", skip.toString());
      httpParams = httpParams.set("$count", "true");
    }

    return httpParams;
  }

  protected addFilterRequestParams(httpParams: HttpParams): HttpParams {
    if (this.filterConf.filters) {
      let filterValue = "";
      this.filterConf.filters.forEach((fieldConf: any) => {
        if (fieldConf.search) {
          if (!!filterValue) {
            filterValue = filterValue + " and ";
          }
          if (
            fieldConf.type.indexOf("number") > -1 &&
            isNumeric(fieldConf.search)
          ) {
            filterValue =
              filterValue + `${fieldConf.field} eq ${fieldConf.search}`;
          }
          if (fieldConf.type.indexOf("text") > -1) {
            filterValue =
              filterValue +
              `contains(tolower(${fieldConf.field}),tolower('${fieldConf.search}'))`;
          }
          // TODO: enum/datetime to string.
          if (
            fieldConf.type.indexOf("enum") > -1 ||
            fieldConf.type.indexOf("datetime") > -1
          ) {
            filterValue =
              filterValue +
              `contains(tolower(cast(${fieldConf.field}, Edm.String)),'${fieldConf.search}')`;
          }
        }
      });
      if (filterValue) {
        httpParams = httpParams.set(this.conf.filterFieldKey, filterValue);
      }
    }

    return httpParams;
  }

  setEndPointsParas(paras: any) {
    if (!!paras && paras) {
      this.endPointParas = paras;
    }
  }

  protected getEndPointsWithParas() {
    let endPoints = this.conf.endPoint;
    if (!!this.endPointParas) {
      endPoints += "(";
      if (this.endPointParas instanceof Map) {
        for (const [key, value] of this.endPointParas) {
          if (!endPoints.endsWith("(")) {
            endPoints += ",";
          }
          endPoints += `${key}=\'${value}\'`;
        }
      }
      if (this.endPointParas instanceof Array) {
        this.endPointParas.forEach((para) => {
          if (!endPoints.endsWith("(")) {
            endPoints += ",";
          }
          endPoints += `${para}`;
        });
      }
      endPoints += ")";
    }

    return endPoints;
  }

  protected requestElements(): Observable<any> {
    if (!!this.endPointParas && this.endPointParas.length == 0) {
      return new Observable();
    }

    const httpParams = this.createRequestParams();

    return this.http.get(this.getEndPointsWithParas(), {
      params: httpParams,
      observe: "response",
    });
  }

  protected addSortRequestParams(httpParams: HttpParams): HttpParams {
    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        const sortField = fieldConf.field + " " + fieldConf.direction;
        httpParams = httpParams.set(this.conf.sortFieldKey, sortField);
      });
    }

    return httpParams;
  }
}
