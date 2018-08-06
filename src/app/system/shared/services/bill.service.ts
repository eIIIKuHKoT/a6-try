import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

import {Bill} from "../models/bill.model";



@Injectable()
export class BillService {

  key = '09b6f3f5bae5022f8a24f6843f618888';
  constructor(private http: HttpClient) {

  }

  getBill(): Observable<Bill> {

    return this.http.get('http://localhost:3000/bill')
      .pipe(
        map((bill: Bill) => {
          return bill;
        })
      );
  }

  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${this.key}&symbols=USD,UAH`)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }
}
