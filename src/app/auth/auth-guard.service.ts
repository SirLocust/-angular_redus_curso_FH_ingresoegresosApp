import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router'
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public authService:AuthService) { }

  canActivate():Observable<boolean>{
    return this.authService.isAuth()
  }
}
