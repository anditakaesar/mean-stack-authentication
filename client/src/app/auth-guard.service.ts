import { Injectable }           from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route
}                               from '@angular/router'
import { UserService }          from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private userService: UserService, private router: Router) { }

  checkLogin(url: string): boolean {
    if (this.userService.isLoggedIn) { return true }

    // store the attempted URL for redirecting
    this.userService.redirectUrl = url;

    // create dummy sessionId
    let sessionId = 12341234;

    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    }

    // navigate to the login page with extras
    this.router.navigate(['/user/login'], navigationExtras);
    return false;
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

}
