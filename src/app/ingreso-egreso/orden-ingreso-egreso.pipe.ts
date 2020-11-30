import { IngresoEgreso } from './ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    const newItems = Array.from(items);
    return newItems.sort( (a) => {
      if(a.tipo === 'ingreso'){
        return 1;
      }
      return -1;
    });
  }

}
