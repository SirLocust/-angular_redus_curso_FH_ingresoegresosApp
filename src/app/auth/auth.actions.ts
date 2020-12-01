import { User } from './user.model';
import { Action } from '@ngrx/store';
export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User';

export class SetUSerAction implements Action {
  readonly type = SET_USER;

  constructor(private user: User) {}

  getUser(): User {
    return this.user;
  }
}

export class UnsetUserAction implements Action {
  readonly type = UNSET_USER;
}

export type acciones = SetUSerAction | UnsetUserAction;
