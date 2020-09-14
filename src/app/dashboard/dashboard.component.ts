import { Store } from '@ngrx/store';
import { IngresoEgreso } from './../ingreso-egreso/ingreso-egreso.model';
import { IngresoEgresoService } from './../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
 
  constructor( private ingresoEgresoService:IngresoEgresoService,
    ) { }


  ngOnInit(): void {
    
    this.ingresoEgresoService.initIngresoEgresoListener()
  }

}
