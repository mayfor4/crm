import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  

  indicadores = {
    ingresos: 1264030,
    ocupacionSalon: 85,
    clientesRecurrentes: 320,
    nuevosRegistros: 45
  };

  // Promociones en curso  
  promociones = [
    { nombre: 'Student Night', estado: 'Activa' },
    { nombre: 'El Último Asistente', estado: 'Pendiente' },
    { nombre: 'Sorteo Especial', estado: 'Finalizada' }
  ];

  ngAfterViewInit() {
    this.crearGraficoEventos();
    this.crearGraficoVentas();
  }

  //  Gráfico de Pastel:  
  crearGraficoEventos() {
    new Chart("graficoEventos", {
      type: 'doughnut',
      data: {
        labels: ['Eventos Activos', 'Eventos Finalizados', 'Fidelización Activa'],
        datasets: [{
          data: [50, 30, 20], // 📌 Datos simulados
          backgroundColor: ['#ff5733', '#33c4ff', '#33ff57']
        }]
      }
    });
  }

  //  Gráfico de Barras: 
  crearGraficoVentas() {
    new Chart("graficoVentas", {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Ventas ($)',
            data: [15000, 18000, 17000, 21000, 25000, 22000], 
            backgroundColor: '#007bff'
          },
          {
            label: 'Impacto de Fidelización (%)',
            data: [10, 15, 18, 20, 25, 30],
            backgroundColor: '#28a745'
          }
        ]
      }
    });
  }
}