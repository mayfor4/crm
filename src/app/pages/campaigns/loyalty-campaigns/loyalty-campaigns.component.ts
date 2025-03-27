import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loyalty-campaigns',
  templateUrl: './loyalty-campaigns.component.html',
  imports: [CommonModule],
  styleUrls: ['./loyalty-campaigns.component.css']
})
export class LoyaltyCampaignsComponent {
  clientes = [
    { nombre: 'Juan Pérez', edad: 25, correo: 'juan.perez@example.com', numero: '+52 427 123 4567' },
    { nombre: 'Ana Gómez', edad: 30, correo: 'ana.gomez@example.com', numero: '+52 427 234 5678' },
    { nombre: 'Luis Martínez', edad: 28, correo: 'luis.martinez@example.com', numero: '+52 427 345 6789' },
    { nombre: 'María López', edad: 22, correo: 'maria.lopez@example.com', numero: '+52 427 456 7890' },
    { nombre: 'Carlos Sánchez', edad: 35, correo: 'carlos.sanchez@example.com', numero: '+52 427 567 8901' },
    { nombre: 'Laura Fernández', edad: 27, correo: 'laura.fernandez@example.com', numero: '+52 427 678 9012' },
    { nombre: 'Pedro Ramírez', edad: 31, correo: 'pedro.ramirez@example.com', numero: '+52 427 789 0123' },
    { nombre: 'Sofía Torres', edad: 29, correo: 'sofia.torres@example.com', numero: '+52 427 890 1234' },
    { nombre: 'Miguel Herrera', edad: 33, correo: 'miguel.herrera@example.com', numero: '+52 427 901 2345' },
    { nombre: 'Isabel Núñez', edad: 26, correo: 'isabel.nunez@example.com', numero: '+52 427 012 3456' },
    { nombre: 'Ricardo Castro', edad: 32, correo: 'ricardo.castro@example.com', numero: '+52 427 123 4568' },
    { nombre: 'Gabriela Vega', edad: 24, correo: 'gabriela.vega@example.com', numero: '+52 427 234 5679' },
    { nombre: 'Fernando Rojas', edad: 36, correo: 'fernando.rojas@example.com', numero: '+52 427 345 6790' },
    { nombre: 'Paula Ortega', edad: 28, correo: 'paula.ortega@example.com', numero: '+52 427 456 7901' },
    { nombre: 'Javier Reyes', edad: 30, correo: 'javier.reyes@example.com', numero: '+52 427 567 8012' },
    { nombre: 'Marta Ruiz', edad: 27, correo: 'marta.ruiz@example.com', numero: '+52 427 678 9123' },
    { nombre: 'Diego Vargas', edad: 29, correo: 'diego.vargas@example.com', numero: '+52 427 789 0234' },
    { nombre: 'Elena Silva', edad: 31, correo: 'elena.silva@example.com', numero: '+52 427 890 1345' },
    { nombre: 'Andrés Morales', edad: 34, correo: 'andres.morales@example.com', numero: '+52 427 901 2456' },
    { nombre: 'Patricia Mendoza', edad: 25, correo: 'patricia.mendoza@example.com', numero: '+52 427 012 3567' }
  ];

  createCampaign(tipo: string): void {
    alert(`Crear campaña de ${tipo}`);
  }
}