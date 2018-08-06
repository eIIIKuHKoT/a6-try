import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ek-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;

  currencies: string[] = [];
  date: Date = new Date();

  ngOnInit() {
    for (let c of this.currency) {
      if (c['ccy'] === 'USD') {
        this.currencies.push({key: 'USD', value: 1 / c['buy']});
      }
      if (c['ccy'] === 'EUR') {
        this.currencies.push({key: 'EUR', value: 1 / c['buy']});
      }
    }
  }
}
