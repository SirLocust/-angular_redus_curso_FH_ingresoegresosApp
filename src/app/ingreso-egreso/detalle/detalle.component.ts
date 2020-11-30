import Swal from 'sweetalert2';
import { IngresoEgresoService } from './../ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}
  ingresosEgrososItems: IngresoEgreso[];
  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe((ingresoEgreso) => {
      this.ingresosEgrososItems = ingresoEgreso.items;
    });
  }

  borrarTtem(item: IngresoEgreso): void {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then(() => {
      Swal.fire(
        'Eliminado Correctamente',
        ` el ${item.tipo} ${item.description} fue eliminado correctamente`,
        'success'
      );
    });
  }
}
