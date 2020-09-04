import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth/';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}


initAuthListerer(): void{

  this.afAuth.authState.subscribe( fbUser => {
    console.log(fbUser)
  })
}

  crearUsuario(nombre: string, email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal.fire('Error registro', error.code,'error')
      });
  }

  loginUsuario(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        
        Swal.fire('Error Login',err.code,'error')
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
