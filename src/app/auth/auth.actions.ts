import { User } from './user.model';
import { Action } from '@ngrx/store';
export const SET_USER = '[Auth] Set User'


export class SetUSerAction implements Action{
    readonly type = SET_USER;

    constructor( private user: User){

    }

    getUser():User{
        return this.user;
    }
}

export type acciones = SetUSerAction;