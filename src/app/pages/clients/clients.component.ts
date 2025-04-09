import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-clients',
  imports: [FormsModule, CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients: any[] = [];
  newClient: any = {};
  editingIndex: number | null = null;
  showForm: boolean = false; // Para mostrar u ocultar el modal

  addClient() {
    const compras = this.extractCompras(this.newClient.historialCompras);
    const nivelLealtad = this.calcularLealtad(compras.length);

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
    this.closeForm(); // Oculta el formulario después de guardar
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

  calcularLealtad(numCompras: number): string {
    if (numCompras >= 6) return 'Alto';
    if (numCompras >= 3) return 'Medio';
    return 'Bajo';
  }
}
