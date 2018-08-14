import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import {map} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {

  constructor(private db: AngularFirestore) {

  }

  private get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  update<T>(ref: DocPredicate<T>, data: any) {
    data.updatedAt = this.timestamp;
    return this.doc(ref).update(data);
  }

  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp;
    data.updatedAt = timestamp;
    data.createdAt = timestamp;
    return this.doc(ref).set(data);
  }

  add<T>(ref: CollectionPredicate<T>, data) {
    const timestamp = this.timestamp;
    data.updatedAt = timestamp;
    data.createdAt = timestamp;
    console.log('in adding user');
    return this.col(ref).add(data);
  }

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.db.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.db.doc<T>(ref) : ref;
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(
      map(doc => {
        return doc.payload.data() as T;
      })
    );
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map(a => a.payload.doc.data()) as T[];
      })
    );
  }
}
