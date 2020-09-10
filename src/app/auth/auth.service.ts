import { SetUSerAction } from './auth.actions';
import { AppState } from './../app.reducer';
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from './../shared/ui.accions';
import { User, DataObjec } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {

  }

  initAuthListerer(): void {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if(fbUser){
        this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe( (usuarioObj:DataObjec)=> {

            const newUser = User.creteUserOb(usuarioObj)
            this.store.dispatch( new SetUSerAction(newUser))
          })
      }

    });
  }



  crearUsuario(nombre: string, email: string, password: string): void {
    this.dispatchLoading(true)

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const user = new User(nombre, resp.user.email, resp.user.uid);

        this.createUserDB(user);
        this.dispatchLoading(false)

      })
      .catch((error: firebase.FirebaseError) => {
        this.dispatchLoading(false)

        Swal.fire('Error registro', error.message, 'error');
      });
  }

  loginUsuario(email: string, password: string): void {
    this.dispatchLoading(true)
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        this.dispatchLoading(false)
        
        this.router.navigate(['/']);
      })
      .catch((err: firebase.FirebaseError) => {
        this.dispatchLoading(false)
        
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
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        if (fbUser === null) {
          this.router.navigate(['login']);
        }
        return fbUser != null;
      })
    );
  }

  createUserDB(user: User): void {
    this.afDB
      .doc(`${user.getUID()}/usuario`)
      .set(user.getUserObjectJS())
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  dispatchLoading(estado: boolean):void{
    if(estado){
      this.store.dispatch( new ActivarLoadingAction())
      return
    }
    if(!estado){
      this.store.dispatch( new DesactivarLoadingAction())
    }
  }

}
