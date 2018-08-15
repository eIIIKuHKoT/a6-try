import {Component, OnDestroy, OnInit} from '@angular/core';

import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {combineLatest, Subscription} from "rxjs";
import {Bill} from "../shared/models/bill.model";
import {Category} from "../shared/models/category.model";
import {EKEvent} from "../shared/models/event.model";

@Component({
  selector: 'ek-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: EKEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {

    const combined = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    );

    this.sub1 = combined.subscribe((data: [Bill, Category[], EKEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => {
      return (e.categoryID === cat.id && e.type === 'outcome');
    });
    return catEvents.reduce((total, event) => {

      total += event.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return (percent > 100 ? 100 : percent);
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';

  }
}
