import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

import {Bill} from "../models/bill.model";
import {BaseApi} from "../../../shared/core/base-api";


@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {

    return this.get('bill');
  }

  getCurrency(): Observable<any> {
    return this.http.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  updateBill(bill: Bill): Observable<Bill> {

    return this.put('bill', bill);
  }
}
