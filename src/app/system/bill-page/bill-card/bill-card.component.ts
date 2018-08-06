import {Component, Input, OnInit} from '@angular/core';
import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'ek-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: int;
  euro: int;

  constructor() {
  }

  ngOnInit() {
    for (let c of this.currency) {
        if (c['ccy'] === 'USD') {
          this.dollar = this.bill.value / c['buy'];
          console.log('dol', this.bill.value / c['buy']);
        }
        if (c['ccy'] === 'EUR') {
          this.euro = this.bill.value / c['buy'];
          console.log('eur', this.bill.value / c['buy']);
        }
    }

  }

}
