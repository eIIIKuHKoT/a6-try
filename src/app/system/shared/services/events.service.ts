import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

import {BaseApi} from "../../../shared/core/base-api";
import {EKEvent} from "../models/event.model";
import {FirestoreService} from "../../../shared/services/firestore.service";
import {AuthService} from "../../../shared/services/auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {map} from "rxjs/internal/operators";

@Injectable()
export class EventsService extends BaseApi {

  eventCollection: AngularFirestoreCollection<EKEvent>;
  event;
  table = 'events';

  constructor(public http: HttpClient,
              private firestoreService: FirestoreService,
              private authService: AuthService,
              private db: AngularFirestore) {
    super(http);
    this.eventCollection = db.collection(this.table);

  }

  addEvent(event): Promise<any> {
    event.id = this.eventCollection.ref.doc().id;
    return this.firestoreService
      .set(this.eventCollection.doc(event.id), event)
      .then(() => {
        return this.eventCollection.ref.doc(event.id).get();
      })
      .then(doc => {
        return doc.data();
      });
  }

  getEventsObservable(): Observable<EKEvent[]> {
    return this.eventCollection.valueChanges();
  }

  getEvents(): Promise<any> {
    return this.eventCollection.ref.get()
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

  getEventByID(id: string): Promise<any> {
    return this.eventCollection.doc(id).ref
      .get()
      .then(doc => {
        return doc.data();
      });
  }
}
