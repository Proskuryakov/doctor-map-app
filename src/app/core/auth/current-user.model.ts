import { Role } from './role.model';

export interface LoggedUser {
  readonly authenticated: true;
  readonly email: string;
  readonly fio: string;

  hasRole(role: Role): boolean;
}

export interface Anonymous {
  readonly authenticated: false;

  hasRole(role: Role): boolean;
}

export type CurrentUser = LoggedUser | Anonymous;
