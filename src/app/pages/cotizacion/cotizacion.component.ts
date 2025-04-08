import { Component } from '@angular/core';

@Component({
  selector: 'app-cotizacion',
  imports: [],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent {
  tipoSeleccionado: string = '';

  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
  }
}
