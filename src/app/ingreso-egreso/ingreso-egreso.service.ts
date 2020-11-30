import { SetItemsAction } from './ingreso-egreso.actions';

import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  ingreosEgresoListenerSub: Subscription = new Subscription();
  ingresoEgresoItemsSub: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  initIngresoEgresoListener(): void {
    this.ingreosEgresoListenerSub = this.store
      .select('auth')

      .pipe(filter((auth) => auth.user != null))
      .subscribe((auth) => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string): void {
    this.ingresoEgresoItemsSub = this.afDB
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((docData) => {
          return docData.map((doc) => {
            return {
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as IngresoEgreso),
            };
          });
        })
      )
      .subscribe((colecion: IngresoEgreso[]) => {
        this.store.dispatch(new SetItemsAction(colecion));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<DocumentReference> {
    return this.afDB
      .doc(`${this.authService.getUsuario().getUID()}/ingresos-egresos`)
      .collection('items')
      .add(JSON.parse(JSON.stringify(ingresoEgreso)));
  }

  cancelarSubscriptions(): void {
    this.ingreosEgresoListenerSub.unsubscribe();
    this.ingresoEgresoItemsSub.unsubscribe();
  }
}
