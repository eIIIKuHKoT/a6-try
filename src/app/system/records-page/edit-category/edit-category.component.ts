import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Observable, Subscription} from "rxjs/index";
import {Message} from "../../../shared/models/message.model";

@Component({
  selector: 'ek-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];

  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryID = '';
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) {
  }

  sub1: Subscription;

  ngOnInit() {
    this.message = new Message('', 'success');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }
    const category = {name, capacity, id: this.currentCategoryID};
    this.categoriesService.updateCategory(category)
      .then((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category updated successfully';
        window.setTimeout(() => {
          this.message.text = '';
        }, 5000);
      });
  }

  onCategoryChange() {
    if (!this.currentCategoryID) {
      this.currentCategory = this.categories[0];
      this.currentCategoryID = this.categories[0].id;
    } else {
      this.currentCategory = this.categories
        .find((c => c.id === this.currentCategoryID));
    }
  }

}
