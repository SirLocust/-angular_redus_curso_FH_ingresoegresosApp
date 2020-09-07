import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {
  private cargando:boolean = false
  private subscription: Subscription;
  
  constructor( public authService: AuthService,
              private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
      .subscribe( ui =>  this.cargando = ui.isLoading )

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onSumit(formData):void{
    this.authService.crearUsuario(formData.nombre, formData.email, formData.password);
  }

  getCargando():boolean{
    return this.cargando
  }

}
