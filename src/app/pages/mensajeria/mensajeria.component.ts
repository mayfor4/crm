import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Mensaje {
  emisor: string;
  receptor: string;
  contenido: string;
  fecha: Date;
}

@Component({
  selector: 'app-mensajeria',
  imports: [FormsModule,CommonModule],
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent {
  usuarioActual: string = 'Ana';
  empleados: string[] = ['Ana', 'Luis', 'Marta', 'Carlos'];
  receptorSeleccionado: string = 'Luis';
  nuevoMensaje: string = '';
  mensajes: Mensaje[] = [];

  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;

    this.mensajes.push({
      emisor: this.usuarioActual,
      receptor: this.receptorSeleccionado,
      contenido: this.nuevoMensaje,
      fecha: new Date()
    });

    this.nuevoMensaje = '';

    setTimeout(() => {
      const panel = document.querySelector('.mensajes-chat');
      panel?.scrollTo({ top: panel.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  obtenerConversacion(): Mensaje[] {
    return this.mensajes.filter(msg =>
      (msg.emisor === this.usuarioActual && msg.receptor === this.receptorSeleccionado) ||
      (msg.emisor === this.receptorSeleccionado && msg.receptor === this.usuarioActual)
    );
  }

  obtenerFechaFormateada(fecha: Date): string {
    const hoy = new Date();
    const msgDate = new Date(fecha);
    if (
      hoy.toDateString() === msgDate.toDateString()
    ) return 'Hoy';
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);
    if (ayer.toDateString() === msgDate.toDateString()) return 'Ayer';

    return msgDate.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}