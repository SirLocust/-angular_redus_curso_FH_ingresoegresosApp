import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  initAuthListerer(): void {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch((error: firebase.FirebaseError) => {
        Swal.fire('Error registro', error.code, 'error');
      });
  }

  loginUsuario(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        this.router.navigate(['/']);
      })
      .catch((err: firebase.FirebaseError) => {
        Swal.fire('Error Login', err.code, 'error');
      });
  }
  logOut(): void {
    this.afAuth
      .signOut()
      .then((resp) => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  isAuth(): Observable<boolean> {
    return this.afAuth.authState
    .pipe(
      map((fbUser) => {
        if(fbUser === null){
          this.router.navigate(['login'])
        }
        return fbUser != null
      })
      );
  }
}
