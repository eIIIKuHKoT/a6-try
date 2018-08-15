import { Component, OnInit } from '@angular/core';
import {Category} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'ek-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  isLoaded = false;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;

        this.isLoaded = true;
      });
  }
  newCategoryAdded(category: Category) {
      const index = this.categories
        .findIndex(c => c.id === category.id);
      if (!index) {
        this.categories.push(category);
      }
  }

  categoryWasEdited(category: Category) {
    const index = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[index] = category;
  }

}
