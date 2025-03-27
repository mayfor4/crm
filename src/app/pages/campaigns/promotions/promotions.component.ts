import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Promocion {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  tipo: string;
}

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  promociones: Promocion[] = [
    { id: 1, nombre: 'Descuento Verano', descripcion: '20% de descuento en bebidas', fechaInicio: '2025-06-01', fechaFin: '2025-06-30', tipo: 'general' },
    { id: 2, nombre: '2x1 en Entradas', descripcion: 'Compra una entrada y llévate otra gratis', fechaInicio: '2025-07-01', fechaFin: '2025-07-15', tipo: 'clientes' },
    { id: 3, nombre: 'Descuento Estudiantes', descripcion: '15% de descuento para estudiantes', fechaInicio: '2025-08-01', fechaFin: '2025-08-31', tipo: 'general' },
    { id: 4, nombre: 'Semana del Café', descripcion: '10% de descuento en todas las bebidas de café', fechaInicio: '2025-09-01', fechaFin: '2025-09-07', tipo: 'clientes' },
    { id: 5, nombre: 'Promoción de Otoño', descripcion: '30% de descuento en productos seleccionados', fechaInicio: '2025-10-01', fechaFin: '2025-10-31', tipo: 'general' },
    { id: 6, nombre: 'Descuento para Nuevos Clientes', descripcion: '25% de descuento en la primera compra', fechaInicio: '2025-11-01', fechaFin: '2025-11-30', tipo: 'clientes' },
    { id: 7, nombre: 'Black Friday', descripcion: '50% de descuento en todos los productos', fechaInicio: '2025-11-27', fechaFin: '2025-11-27', tipo: 'general' },
    { id: 8, nombre: 'Cyber Monday', descripcion: '40% de descuento en compras online', fechaInicio: '2025-11-30', fechaFin: '2025-11-30', tipo: 'general' },
    
  ];

  promocion: Promocion = this.getEmptyPromocion();

  getEmptyPromocion(): Promocion {
    return { id: 0, nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', tipo: 'general' };
  }

  onSubmit(): void {
    if (this.promocion.id === 0) {
      this.promocion.id = this.promociones.length + 1;
      this.promociones.push(this.promocion);
    } else {
      const index = this.promociones.findIndex(p => p.id === this.promocion.id);
      if (index !== -1) {
        this.promociones[index] = { ...this.promocion };
      }
    }
    this.promocion = this.getEmptyPromocion();
  }

  editarPromocion(promo: Promocion): void {
    this.promocion = { ...promo };
  }

  eliminarPromocion(id: number): void {
    this.promociones = this.promociones.filter(p => p.id !== id);
  }
}