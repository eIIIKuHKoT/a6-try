import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Observable} from "rxjs/index";
import {Message} from "../../../shared/models/message.model";

@Component({
  selector: 'ek-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];

  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryID = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('', 'success');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }
    const category = new Category(name, capacity, +this.currentCategoryID);
    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
          this.onCategoryEdit.emit(category);
          this.message.text = 'Категория успешно отпредактирована.';
          window.setTimeout(() => {
            this.message.text = '';
          }, 5000);
      });
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find((c => c.id === +this.currentCategoryID));
  }


}
