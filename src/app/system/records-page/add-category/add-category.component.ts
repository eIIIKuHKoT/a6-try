import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {Category} from "../../shared/models/category.model";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'ek-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategoryAdd: EventEmitter<any> = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    let {name, capacity} = form.value;
    if (capacity < 0) {
      capacity = -1;
    }

    this.categoriesService.addCategory({name, capacity})
      .then((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
      });
  }
}
