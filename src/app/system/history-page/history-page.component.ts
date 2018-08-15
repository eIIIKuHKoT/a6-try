import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from "rxjs";
import * as moment from 'moment';

import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Category} from "../shared/models/category.model";
import {EKEvent} from "../shared/models/event.model";

@Component({
  selector: 'ek-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  isLoaded = false;
  events: EKEvent[];
  filteredEvents: EKEvent[] = [];
  categories: Category[] = [];
  chartsData = [];
  isFilterVisible = false;

  constructor(private categoriesService: CategoriesService,
              private eventsService: EventsService) {
  }

  ngOnInit() {

    combineLatest(
      this.categoriesService.getCategoriesObservable(),
      this.eventsService.getEventsObservable()
    ).subscribe((data: [Category[], EKEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartsData = [];
    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter(e => {
        if (typeof e.createdAt === 'object') {
          e.createdAt = e.createdAt.toMillis();
        }
        return e.categoryID === cat.id && e.type === 'outcome';
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

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }


  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.filteredEvents = this.filteredEvents.filter(e => {
        return filterData.types.indexOf(e.type) !== -1;
    }).filter(e => {
        return filterData.categories.indexOf(e.categoryID) !== -1;
    }).filter(e => {
      const momentDate = moment(e.createdAt);
      console.log(momentDate);
      return momentDate.isBetween(startPeriod, endPeriod);
    });
    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

}
