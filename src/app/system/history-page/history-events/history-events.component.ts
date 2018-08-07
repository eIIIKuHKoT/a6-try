import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {EKEvent} from "../../shared/models/event.model";

@Component({
  selector: 'ek-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: EKEvent[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма...';
  searchField = 'amount';

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => {
        return c.id === e.category;
      }).name;
    });

  }

  getEventClass(e: EKEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
      const namesMap = {
        amount: 'Сумма',
        date: 'Дата',
        category: 'Категория',
        type: 'Тип'
      };
      this.searchPlaceholder = namesMap[field] + '...';
      this.searchField = field;
  }

}
