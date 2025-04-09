import { Component } from '@angular/core';
import { faChevronDown, faChevronUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent {
  tipoSeleccionado: string = '';

  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faPlus = faPlus;

  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
  }
}
