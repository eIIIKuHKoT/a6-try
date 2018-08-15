import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

import {BaseApi} from "../../../shared/core/base-api";
import {EKEvent} from "../models/event.model";
import {FirestoreService} from "../../../shared/services/firestore.service";
import {AuthService} from "../../../shared/services/auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";

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

  getEvents(): Observable<EKEvent[]> {
    return this.get('events');
  }

  getEventByID(id: string): Observable<EKEvent> {
    return this.get(`events/${id}`);
  }
}
