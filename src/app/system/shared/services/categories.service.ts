import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

import {BaseApi} from "../../../shared/core/base-api";
import {Category} from "../models/category.model";
import {FirestoreService} from "../../../shared/services/firestore.service";


@Injectable()
export class CategoriesService extends BaseApi {

  categoriesCol: AngularFirestoreCollection<Category>;
  table = 'categories';

  constructor(public http: HttpClient,
              private db: AngularFirestore,
              private firestoreService: FirestoreService) {
    super(http);
    this.categoriesCol = db.collection(this.table);
  }

  addCategory(category): Promise<any> {
      category.id = this.categoriesCol.ref.doc().id;
      return this.firestoreService
        .set(this.categoriesCol.doc(category.id), category)
        .then(() => {
          return this.categoriesCol.ref.doc(category.id).get();
        })
        .then(doc => {
          return doc.data();
        });
  }

  getCategoriesObservable(): Observable<Category[]> {
    return this.categoriesCol.valueChanges();
  }

  getCategories(): Promise<any> {
    return this.categoriesCol.ref.get()
      .then(querySnap => {
        let result = [];
        if (querySnap.empty === true) {
          return result;
        } else {
          for (let doc of querySnap.docs) {
            result.push(doc.data());
          }
          return result;
        }
      });
  }

  updateCategory(category): Promise<any> {
    return this.categoriesCol.doc(category.id)
      .update(category)
      .then(() => {
        return this.categoriesCol.ref.doc(category.id).get();
      })
      .then(doc => {
        return doc.data();
      });
  }

  getCategoryByID(id: string): Promise<any> {
    return this.categoriesCol.doc(id).ref
      .get()
      .then(doc => {
        return doc.data();
      });


  }

}
