import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

import {BaseApi} from "../../../shared/core/base-api";
import {Category} from "../models/category.model";
import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {promise} from "selenium-webdriver";
import map = promise.map;

@Injectable()
export class CategoriesService extends BaseApi {

  categoriesCol: AngularFirestoreCollection<Category>;
  constructor(public http: HttpClient,
              private db: AngularFirestore) {
    super(http);
    this.categoriesCol = db.collection('categories');
  }

  addCategory(category: Object): Promise<any> {
      category['id'] = this.categoriesCol.ref.doc().id;
      return this.categoriesCol.ref.doc(category['id']).set(category)
        .then(category => {
          return category;
        });
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesCol.valueChanges();
  }

  updateCategory(category): Promise<any> {
    return this.categoriesCol.doc(category.id)
      .update(category)
      .then(() => {
        return category;
      });
  }

  getCategoryByID(id: string): Observable<Category> {
    return this.get(`categories/${id}`);
  }

}
