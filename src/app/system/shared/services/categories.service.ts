import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

import {BaseApi} from "../../../shared/core/base-api";
import {Category} from "../models/category.model";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
      return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {

    return this.get('categories');

  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

}
