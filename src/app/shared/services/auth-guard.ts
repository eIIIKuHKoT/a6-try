import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import {Injectable} from "@angular/core";

import {AngularFireAuth} from "angularfire2/auth";
import {map} from "rxjs/internal/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private firebaseAuth: AngularFireAuth) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.firebaseAuth.authState
      .pipe(
        map(user => !!user),
        map((loggedIn) => {
          if (!loggedIn) {
            this.router.navigate(['/login'], {
              queryParams: {
                accessDenied: true
              }
            });
            return false;
          }
          return true;
        })
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
