import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

import {User} from "../models/user.model";
import {map} from "rxjs/internal/operators";
import {BaseApi} from "../core/base-api";
import {PrefilledUser} from "../models/prefilled-user.model";


@Injectable()
export class UsersService extends BaseApi {

  private prefilledUsers: AngularFirestoreCollection<PrefilledUser>;

  constructor(public http: HttpClient,
              private db: AngularFirestore) {
    super(http);
    this.prefilledUsers = this.db.collection<PrefilledUser>('prefilledUsers');
  }


  getUserByEmail(email): Observable<User> {

    return this.get(`users?email=${email}`)
      .pipe(
        map((user: User) => {
          return (user[0] ? user[0] : undefined);
        })
      );
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  getPrefilledUserByEmail(email: string) {
    return this.prefilledUsers.ref.where('email', '==', email)
      .get()
      .then(querySnap => {
        console.log(querySnap);
        if (querySnap.empty === true) {
          return false;
        } else {
          return querySnap.docs[0].data();
        }
      });
  }
}
