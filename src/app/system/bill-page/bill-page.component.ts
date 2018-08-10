import {Component, OnDestroy, OnInit} from '@angular/core';

import {BillService} from "../shared/services/bill.service";
import {combineLatest, Subscription} from "rxjs";
import {Bill} from "../shared/models/bill.model";

@Component({
  selector: 'ek-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit() {

    const combined = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    );

    this.sub1 = combined
      .subscribe((data: [Bill, any]) => {
        console.log(data);
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {

    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }
}
