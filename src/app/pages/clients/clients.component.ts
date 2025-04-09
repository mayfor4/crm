import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faChevronDown, faChevronUp, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-clients',
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients: any[] = [];
  newClient: any = {};
  editingIndex: number | null = null;
  showForm: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;

  addClient() {
    const compras = this.extractCompras(this.newClient.historialCompras);
    const nivelLealtad = this.calcularLealtad(
      compras,
      this.newClient.asistenciaEventos,
      this.newClient.promociones
    );

    const clientData = {
      ...this.newClient,
      compras,
      nivelLealtad
    };

    if (this.editingIndex !== null) {
      this.clients[this.editingIndex] = clientData;
      this.editingIndex = null;
    } else {
      this.clients.push(clientData);
    }

    this.newClient = {};
    this.closeForm();
  }

  closeForm() {
    this.showForm = false;
    this.editingIndex = null;
    this.newClient = {};
  }

  editClient(index: number) {
    const client = this.clients[index];
    this.newClient = {
      ...client,
      historialCompras: client.compras.map((c: number) => `$${c}`).join(', ')
    };
    this.editingIndex = index;
    this.showForm = true;
  }

  deleteClient(index: number) {
    this.clients.splice(index, 1);
    if (this.editingIndex === index) {
      this.closeForm();
    }
  }

  extractCompras(input: string): number[] {
    const matches = input.match(/\$?\d+(\.\d{1,2})?/g);
    return matches ? matches.map((c: string) => parseFloat(c.replace('$', ''))) : [];
  }

  calcularLealtad(compras: number[], asistencia: string, promociones: string): string {
    const totalGasto = compras.reduce((a, b) => a + b, 0);

    // Gasto total
    let puntajeCompras = 0;
    if (totalGasto >= 2000) puntajeCompras = 3;
    else if (totalGasto >= 1000) puntajeCompras = 2;
    else puntajeCompras = 1;

    // Asistencia
    const mapaAsistencia: { [key: string]: number } = {
      'Muy seguido': 3,
      'A menudo': 2,
      'Casi nunca': 1,
      'Rara vez': 0.5
    };
    const puntajeAsistencia = mapaAsistencia[asistencia] || 0;

    // Promociones
    const puntajePromociones = Math.min(parseInt(promociones), 3);

    // Suma total
    const puntajeTotal = puntajeCompras + puntajeAsistencia + puntajePromociones;

    if (puntajeTotal >= 7) return 'Alto';
    if (puntajeTotal >= 4) return 'Medio';
    return 'Bajo';
  }
}
