import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { Timestamp } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-event-insert',
  templateUrl: './event-insert.component.html',
  styleUrls: ['./event-insert.component.css']
})
export class EventInsertComponent {
  eventForm: FormGroup;
  estados = ['Finalizado', 'Agendado', 'En Proceso', 'Cancelado'];
  isSubmitting = false; // Añadida la propiedad faltante

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventsService: EventsService
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      estado: ['', Validators.required],
      tipo: ['', [Validators.required, Validators.maxLength(50)]],
      inicio: ['', [Validators.required, this.futureDateValidator]],
      final: ['', [Validators.required]],
      participantes: [0, [Validators.required, Validators.min(0)]],
      confirmados: [0, [Validators.required, Validators.min(0)]],
      participaciones: [0, [Validators.required, Validators.min(0)]],
      noParticipaciones: [0, [Validators.required, Validators.min(0)]]
    }, { validators: this.dateRangeValidator });
  }

  // Validador para fechas futuras
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  // Validador para rango de fechas
  dateRangeValidator(group: FormGroup) {
    const start = group.get('inicio')?.value;
    const end = group.get('final')?.value;
    
    if (!start || !end) {
      return null;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    
    return endDate >= startDate ? null : { dateRange: true };
  }

  async onSubmit() {
    if (this.eventForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    try {
      const formData = this.eventForm.value;
      const event = {
        ...formData,
        inicio: Timestamp.fromDate(new Date(formData.inicio)),
        final: Timestamp.fromDate(new Date(formData.final))
      };

      await this.eventsService.addEvent(event);
      this.router.navigate(['/events']);
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }
}
