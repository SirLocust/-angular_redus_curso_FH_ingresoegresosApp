import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.accions';
import { AppState } from './../app.reducer';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit , OnDestroy {

  forma : FormGroup;
  tipo = 'ingreso';
  cargando : boolean

  loadingSub:Subscription  = new  Subscription()

  constructor( private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
              
    ) { }

  ngOnInit( ): void {

    this.loadingSub =  this.store.select('ui').subscribe( (ui) => {
        this.cargando = ui.isLoading
    })

    this.forma = new FormGroup({
        'descripcion': new FormControl('jugar',Validators.required),
        'monto': new FormControl(2000, Validators.min(0))
    })
  }

  ngOnDestroy():void{
    this.loadingSub.unsubscribe();
  }

  crearIngresoEgreso(){
    const accionLoading = new ActivarLoadingAction()
    const accionNotLoading = new DesactivarLoadingAction()
    this.store.dispatch(accionLoading)
    let description: string = this.forma.value.descripcion
    let monto: number = this.forma.value.monto
    const ingresoEgresoCreate = new IngresoEgreso(description,monto,this.tipo)
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgresoCreate)
    .then (() => {
      Swal.fire('Creado', ingresoEgresoCreate.description, 'success')
      this.forma.reset()
      this.store.dispatch(accionNotLoading)
    })
    .catch( err =>{
      Swal.fire('Error no se pudo crea', err.code, 'error' )
      this.store.dispatch(accionNotLoading)
    })
  }

}
