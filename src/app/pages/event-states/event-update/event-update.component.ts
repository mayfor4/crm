import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { CommonModule } from '@angular/common';
import { EventModel } from '../../../models/events.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent {

 eventForm!: FormGroup;
  eventId: string | null = null;
  estados = ['Planeado', 'En curso', 'Finalizado', 'Cancelado'];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}  

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      tipo: ['', Validators.required],
      inicio: ['', Validators.required],
      final: ['', Validators.required],
      participantes: [0, [Validators.required, Validators.min(0)]],
      confirmados: [0, [Validators.min(0)]],
      participaciones: [0, [Validators.min(0)]],
      noParticipaciones: [0, [Validators.min(0)]],
    });

    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.loadEventData(this.eventId);
    }
  }

  async loadEventData(id: string) {
    try {
      const event = await this.eventsService.getEventById(id);
      this.eventForm.patchValue({
        nombre: event.nombre,
        estado: event.estado,
        tipo: event.tipo,
        inicio: this.toDatetimeLocal(event.inicio),
        final: this.toDatetimeLocal(event.final),
        participantes: event.participantes,
        confirmados: event.confirmados,
        participaciones: event.participaciones,
        noParticipaciones: event.noParticipaciones
      });
    } catch (error) {
      console.error('Error al cargar evento:', error);
    }
  }

  toDatetimeLocal(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  async onSubmit() {
    if (this.eventForm.invalid || !this.eventId) return;
  
    this.isSubmitting = true;
  
    const formValue = this.eventForm.value;
  
    const updatedEvent: EventModel = {
      id: this.eventId!,
      nombre: formValue.nombre,
      estado: formValue.estado,
      tipo: formValue.tipo,
      inicio: new Date(formValue.inicio),
      final: new Date(formValue.final),
      participantes: formValue.participantes,
      confirmados: formValue.confirmados || 0,
      participaciones: formValue.participaciones || 0,
      noParticipaciones: formValue.noParticipaciones || 0,
    };
  
    try {
      await this.eventsService.updateEvent(this.eventId, updatedEvent);
      this.router.navigate(['/events']);
    } catch (error) {
      console.error('Error al actualizar evento:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

}
