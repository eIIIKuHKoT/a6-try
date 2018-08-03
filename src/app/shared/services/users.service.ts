import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";

import {User} from "../models/user.model";
import {map} from "rxjs/internal/operators";


@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {

  }


  getUserByEmail(email): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((user: User) => {
          return (user[0] ? user[0] : undefined);
        })
      );
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post('http://localhost:3000/users', user)
      .pipe(
        map((response: User) => {
          return response;
        })
      );
  }
}
