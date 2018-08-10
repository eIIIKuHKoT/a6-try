import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";

import {Bill} from "../models/bill.model";
import {FirestoreService} from "../../../shared/services/firestore.service";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {BaseApi} from "../../../shared/core/base-api";
import {AuthService} from "../../../shared/services/auth.service";


@Injectable()
export class BillService extends BaseApi {

  billCollection: AngularFirestoreCollection<Bill>;
  bill: AngularFirestoreDocument<Bill>;
  constructor(public http: HttpClient,
              private firestoreService: FirestoreService,
              private authService: AuthService,
              private db: AngularFirestore) {
    super(http);
    this.billCollection = db.collection('bills');
  }

  getBill(): Observable<Bill> {

    const userBillCol =  this.db.collection('bills', ref => {
      return ref.where('userID', '==', this.authService.userDetails.uid)
        .limit(1);
    });
    return userBillCol.valueChanges().pipe(
      map((bill: Bill[]) => bill ? bill[0] : bill)
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

  updateBill(bill: Bill): Observable<Bill> {

  }
}
