import { IngresoEgresoService } from './../../ingreso-egreso/ingreso-egreso.service';
import { map } from 'rxjs/operators';
import { AuthState } from './../../auth/auth.reducer';
import { User } from './../../auth/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  user: Observable<User>;
  constructor(
    public authService: AuthService,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user = this.store.select('auth').pipe( 
      map( el => el.user)
    );
  }

  logout(): void {
    this.authService.logOut();
    this.ingresoEgresoService.cancelarSubscriptions();
  }
}
