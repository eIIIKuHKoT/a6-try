import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {mergeMap} from "rxjs/internal/operators";
import {EKEvent} from "../../shared/models/event.model";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'ek-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: EKEvent;
  category: Category;

  isLoaded = false;

  sub1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.sub1 = this.route.params.pipe(
      mergeMap((params: Params) => {
        return this.eventsService.getEventByID(params.id);
      }),
      mergeMap((event: EKEvent) => {
        this.event = event;
        this.event.createdAt = event.createdAt.toMillis();
        return this.categoriesService.getCategoryByID(event.categoryID);
      })
    ).subscribe((category: Category) => {
      this.category = category;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
