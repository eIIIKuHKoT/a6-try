import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

import {Bill} from "../models/bill.model";



@Injectable()
export class BillService {

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
    return this.http.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }
}
