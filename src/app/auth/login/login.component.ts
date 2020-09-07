import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  private cargando: boolean = false;
  private subscription: Subscription;
  constructor(
    public authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();

  }

  loginUsuario(formLogin) {
    this.authService.loginUsuario(formLogin.email, formLogin.password);
    // console.log(formLogin)
  }

  getCargando(): boolean {
    return this.cargando;
  }
}
