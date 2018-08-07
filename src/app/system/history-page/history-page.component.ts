import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from "rxjs/index";

import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Category} from "../shared/models/category.model";
import {EKEvent} from "../shared/models/event.model";

@Component({
  selector: 'ek-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;

  events: EKEvent[];
  categories: Category[] = [];

  chartsData = [];

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {

    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], EKEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData()
      this.isLoaded = true;


    });
  }

  calculateChartData(): void {
    this.chartsData = [];
    this.categories.forEach((cat) => {
      const catEvent = this.events.filter(e => {
        return e.category === cat.id && e.type === 'outcome';
      });
      this.chartsData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0),
      });
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
