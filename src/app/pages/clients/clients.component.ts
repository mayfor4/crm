import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { faChevronDown, faChevronUp, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/events.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  clients: Client[] = [];
  newClient: Client = new Client();
  editingClientId: string | null = null;
  showForm: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;

  // Opciones selects
  asistenciaOptions = ['Muy seguido', 'A menudo', 'Casi nunca', 'Rara vez'];
  promocionesOptions = ['3 o más', '2', '1', 'Ninguna'];
i: any;

  constructor(private clientsService: ClientsService) {
    this.getClients();
  }

  async getClients(): Promise<void> {
    try {
      const clientsData = await firstValueFrom(this.clientsService.getClients());
      this.clients = clientsData.map((clientData: any) => ({
        id: clientData.id,
        nombre: clientData.nombre || '',
        telefono: clientData.telefono || '',
        correo: clientData.correo || '',
        direccion: clientData.direccion || '',
        edad: clientData.edad || 0,
        sexo: clientData.sexo || '',
        nivelEstudios: clientData.nivelEstudios || '',
        ocupacion: clientData.ocupacion || '',
        asistenciaEventos: clientData.asistenciaEventos || '',
        compras: clientData.compras || [],
        promociones: clientData.promociones || '',
        nivelLealtad: clientData.nivelLealtad || ''
      } as Client));
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      this.clients = [];
    }
  }

  async addClient() {
    this.calculateLoyalty();
    
    try {
      if (this.editingClientId) {
        this.newClient.id = this.editingClientId;
        await this.clientsService.modificarClient(this.newClient);
      } else {
        await this.clientsService.agregarClient(this.newClient);
      }
      this.getClients();
      this.closeForm();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  }

  closeForm() {
    this.showForm = false;
    this.editingClientId = null;
    this.newClient = new Client();
  }

  editClient(client: Client) {
    this.newClient = { ...client };
    this.editingClientId = client.id;
    this.showForm = true;
  }

  async deleteClient(client: Client) {
    try {
      await this.clientsService.eliminarClient(client);
      this.getClients();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  }

  calculateLoyalty() {
   
    const compras = this.newClient.compras || [];
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
    const puntajeAsistencia = mapaAsistencia[this.newClient.asistenciaEventos || ''] || 0;

    // Promociones
    const promocionesStr = this.newClient.promociones || '0';
    const promocionesNum = parseInt(promocionesStr.split(' ')[0]) || 0;
    const puntajePromociones = Math.min(promocionesNum, 3);

    // Suma total
    const puntajeTotal = puntajeCompras + puntajeAsistencia + puntajePromociones;

    this.newClient.nivelLealtad = puntajeTotal >= 7 ? 'Alto' : puntajeTotal >= 4 ? 'Medio' : 'Bajo';
  }

  onComprasInputChange(event: any) {
    const input = event.target.value || '';
    const matches = input.match(/\$?\d+(\.\d{1,2})?/g);
    this.newClient.compras = matches ? matches.map((c: string) => parseFloat(c.replace('$', ''))) : [];
  }

  getTotalCompras(client: Client): number {
    // Verificación defensiva para evitar el error
    if (!client || !client.compras || !Array.isArray(client.compras)) {
      return 0;
    }
    return client.compras.reduce((a, b) => a + b, 0);
  }
}