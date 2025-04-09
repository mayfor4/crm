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
    globalSearch: '',
    estado: '',
    tipo: '',
    ordenNombre: '',
    ordenInicio: 'desc',
    ordenFinal: 'desc'
  };
  
  estadosDisponibles: string[] = ['Agendado', 'En Proceso', 'Finalizado', 'Cancelado'];
  tiposDisponibles: string[] = [];
  
  // Iconos de FontAwesome
  faPlus = faPlus;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  getEstadoClass(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'agendado':
        return 'badge-morado';
      case 'en proceso':
        return 'badge-amarillo';
      case 'finalizado':
        return 'badge-verde';
      case 'cancelado':
        return 'badge-rojo';
      default:
        return '';
    }
  }

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

  // Resaltar texto coincidente
  highlightText(text: string): string {
    if (!this.filtros.globalSearch) return text;
    
    const searchTerm = this.filtros.globalSearch.toLowerCase();
    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, match => 
      `<span class="highlight">${match}</span>`
    );
  }

  // Filtro y ordenamiento mejorado
  get eventosFiltrados(): EventModel[] {
    return this.events
      .filter(event => {
        const searchTerm = this.filtros.globalSearch?.toLowerCase() || '';
        const matchesSearch = 
          event.nombre.toLowerCase().includes(searchTerm) ||
          event.tipo.toLowerCase().includes(searchTerm) ||
          event.estado.toLowerCase().includes(searchTerm);
        
        const matchesEstado = this.filtros.estado ? 
          event.estado === this.filtros.estado : true;
        
        const matchesTipo = this.filtros.tipo ? 
          event.tipo === this.filtros.tipo : true;
        
        return matchesSearch && matchesEstado && matchesTipo;
      })
      .sort((a, b) => {
        // Orden por nombre
        if (this.filtros.ordenNombre) {
          const nameA = a.nombre.toLowerCase();
          const nameB = b.nombre.toLowerCase();
          return this.filtros.ordenNombre === 'asc' ? 
            nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        }
        
        // Orden por fecha inicio
        if (this.filtros.ordenInicio) {
          const dateA = new Date(a.inicio).getTime();
          const dateB = new Date(b.inicio).getTime();
          return this.filtros.ordenInicio === 'asc' ? dateA - dateB : dateB - dateA;
        }
        
        return 0;
      });
  }
}