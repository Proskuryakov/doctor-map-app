import {
  APP_INITIALIZER,
  Injectable,
  Provider
} from '@angular/core';
import {
  Anonymous,
  CurrentUser,
  LoggedUser
} from './current-user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';
import {Role} from './role.model';

interface ApiProfile {
  id: number,
  email: string,
  fio: string,
  role: Role;
}

export class AnonymousUserImpl implements Anonymous {
  readonly authenticated: false = false;

  hasRole(role: Role): boolean {
    return false;
  }
}

export class CurrentUserImpl implements LoggedUser {
  readonly authenticated: true = true;
  readonly email = this.profile.email;
  readonly fio = this.profile.fio;

  private role: Role = this.profile.role;

  constructor(readonly profile: ApiProfile) {
  }

  hasRole(role: Role): boolean {
    return this.role === role;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  readonly user$ = new BehaviorSubject<CurrentUser>(
    new AnonymousUserImpl()
  );

  constructor(private http: HttpClient) {
    console.log('Current User created');
  }

  refreshCurrentUser(): Observable<void> {
    return this.http
      .get<ApiProfile | undefined>(
        `${environment.api}/auth/profile`
      )
      .pipe(
        tap(profile => {
          if (profile == undefined) {
            this.user$.next(new AnonymousUserImpl());
          } else {
            // @ts-ignore
            this.user$.next(new CurrentUserImpl(profile));
          }
        })
      ) as Observable<void>;
  }

  login(
    email: string,
    password: string
  ): Observable<void> {

    return this.http
      .post<void>(
        `${environment.api}/auth/login`,
        {
          email: email,
          password: password
        }
      )
      .pipe(switchMap(() => this.refreshCurrentUser()));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(
        `${environment.api}/auth/logout`,
        undefined
      )
      .pipe(
        switchMap(() => this.refreshCurrentUser())
      );
  }
}

export function currentUserInitializerFactory(
  currentUserService: CurrentUserService
): () => Promise<void> {
  return () => {
    return currentUserService
      .refreshCurrentUser()
      .toPromise();
  };
}

export const CURRENT_USER_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: currentUserInitializerFactory,
  deps: [CurrentUserService],
  multi: true
};
