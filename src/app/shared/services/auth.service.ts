import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/index";


@Injectable()
export class AuthService {
  isAuthenticated = false;

  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  getCurrentUser() {
    return this._firebaseAuth.auth.currentUser;
  }

  signUpRegular(email, password) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signInRegular(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.isAuthenticated = false;
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/login']));
  }

  isLoggedIn(): boolean {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

}

