import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CurrentUserService} from '../auth/current-user.service';
import {first, map} from 'rxjs/operators';
import {Role} from '../auth/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.currentUserService.user$.pipe(
      first(),
      map((user) => !user.authenticated)
    );
  }

}
