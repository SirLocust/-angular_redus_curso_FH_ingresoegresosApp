import { IngresoEgreso } from './../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {
      this.contarIngresoEgresp(ingresoEgreso.items);
    }

    )
  }

  contarIngresoEgresp( items: IngresoEgreso[]): void{
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {
      if(item.tipo === 'ingreso'){
        this.ingresos += item.monto;
        this.cuantosIngresos++;
      }
      if(item.tipo === 'egreso'){
        this.egresos += item.monto;
        this.cuantosEgresos++;
      }
    })
  }

}
