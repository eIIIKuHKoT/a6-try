import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import * as moment from 'moment';
import {mergeMap} from "rxjs/internal/operators";
import {Subscription} from "rxjs/index";

import {Category} from "../../shared/models/category.model";
import {EKEvent} from "../../shared/models/event.model";
import {EventsService} from "../../shared/services/events.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/models/bill.model";
import {Message} from "../../../shared/models/message.model";


@Component({
  selector: 'ek-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  message: Message;
  types = [
    {type: "income", label: 'Доход'},
    {type: "outcome", label: "Расход"}
  ];

  constructor(private eventsService: EventsService,
              private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('', 'danger');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit(form: NgForm) {
    let {amount, description, categoryID, type} = form.value;
    if (amount < 0) {
      amount *= -1;
    }
    const event = {type, amount, categoryID, description};

    this.billService.getBill()
      .then((bill) => {
        let value = bill.value;
        console.log(bill.value);
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`Не достаточно средств. Вам не хватает ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
        this.billService.updateBill({value, currency: bill.currency, id: bill.id})
          .then(() => {
            return this.eventsService.addEvent(event);
          }).then(event => {
          form.setValue({
            amount: 0,
            description: ' ',
            categoryID: this.categories[0].id,
            type: 'outcome'
          });
        });
      });
  }
}
