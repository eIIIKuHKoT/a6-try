import {CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import {Injectable} from "@angular/core";

import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accessDenied: true
        }
      });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.ccanActivate(childRoute, state);
  }
}
