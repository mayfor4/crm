import { Component } from '@angular/core';
import { EventModel } from '../../models/events.model';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  events: EventModel[] = [];
  mostrarDetalles: { [id: string]: boolean } = {};
  filtros = {
    nombre: '',
    estado: '',
    tipo: '',
    ordenInicio: 'desc',
    ordenFinal: 'desc'
  };
  
  estadosDisponibles: string[] = ['Agendado', 'En Proceso', 'Finalizado', 'Cancelado'];
  tiposDisponibles: string[] = [];
  
  // Iconos de FontAwesome
  faPlus = faPlus;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  constructor(private eventsService: EventsService, private router: Router) {
    this.getEvents();
  }

  //Obtener elementos
  async getEvents(): Promise<void> {
    try {
      this.events = await firstValueFrom(this.eventsService.getEvents()) as EventModel[];
  
      // Ordenar por fecha final descendente al obtener
      this.events.sort((a, b) => new Date(b.final).getTime() - new Date(a.final).getTime());
  
      // Extraer tipos únicos
      const tipos = new Set<string>();
      this.events.forEach(event => {
        tipos.add(event.tipo);
        this.mostrarDetalles[event.id] = false;
      });
      this.tiposDisponibles = Array.from(tipos);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  }

  toggleDetalles(eventId: string): void {
    this.mostrarDetalles[eventId] = !this.mostrarDetalles[eventId];
  }

  trackByEvent(index: number, event: EventModel): string {
    return event.id;
  }

  //Redirigir al formulario para insertar
  goToInsertEvent() {
    this.router.navigate(['/event-insert']);
  }

  //Redirigir al formulario para modificar
  goToUpdateEvent(eventId: string): void {
    this.router.navigate(['/event-update', eventId]);
  }

  //Eliminar elementos
  async eliminarEvento(eventId: string): Promise<void> {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (confirmacion.isConfirmed) {
      try {
        await this.eventsService.deleteEvent(eventId);
        this.events = this.events.filter(event => event.id !== eventId);
        Swal.fire('Eliminado', 'El evento ha sido eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el evento.', 'error');
      }
    }
  }

  // Filtro y ordenamiento en tiempo real
  get eventosFiltrados(): EventModel[] {
    return this.events
      .filter(event => {
        const nombre = this.filtros.nombre?.toLowerCase() || '';
        const coincideNombre = event.nombre.toLowerCase().includes(nombre);
        const coincideEstado = this.filtros.estado ? event.estado === this.filtros.estado : true;
        const coincideTipo = this.filtros.tipo ? event.tipo === this.filtros.tipo : true;
        return coincideNombre && coincideEstado && coincideTipo;
      })
      .sort((a, b) => {
        let resultado = 0;

        if (this.filtros.ordenInicio) {
          const fechaA = new Date(a.inicio).getTime();
          const fechaB = new Date(b.inicio).getTime();
          resultado = this.filtros.ordenInicio === 'asc' ? fechaA - fechaB : fechaB - fechaA;
        }

        if (this.filtros.ordenFinal) {
          const fechaA = new Date(a.final).getTime();
          const fechaB = new Date(b.final).getTime();
          const resultadoFinal = this.filtros.ordenFinal === 'asc' ? fechaA - fechaB : fechaB - fechaA;
          resultado += resultadoFinal;
        }

        return resultado;
      });
  }

}