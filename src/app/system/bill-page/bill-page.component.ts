import {Component, OnDestroy, OnInit} from '@angular/core';

import {BillService} from "../shared/services/bill.service";
import {combineLatest, Subscription} from "rxjs/index";
import {Bill} from "../shared/models/bill.model";

@Component({
  selector: 'ek-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private billService: BillService) {
  }

  ngOnInit() {

    const combined = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    );

    this.subscription = combined
      .subscribe((data: [Bill, any]) => {
        console.log(data);
      });
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }
}
