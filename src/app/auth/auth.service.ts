import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  crearUsuario(nombre: string, email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loginUsuario(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  logOut(){
    this.afAuth.signOut()
    .then( resp => {
      this.router.navigate(['/login'])
    })
    .catch( err => {
      console.error(err)
    })
  }
}
