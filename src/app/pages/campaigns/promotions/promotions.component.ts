import { Component} from '@angular/core';
import { PromocionesModel } from '../../../models/promociones.model';
import { PromocionesService } from '../../../services/promociones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, throwIfEmpty } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faChevronDown, faChevronUp, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  imports: [FormsModule, CommonModule, FontAwesomeModule], 
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent{
  
  promociones: PromocionesModel[] = [];
  promocion = new PromocionesModel();

  constructor(private promocionesService: PromocionesService) {
    this.getElements();
  }

  async getElements(): Promise<void> {
    try {
      const promocionesData = await firstValueFrom(this.promocionesService.getPromociones());
      
      // Nos aseguramos de que todos los campos estén presentes
      this.promociones = promocionesData.map((promocionData: any) => ({
        id: promocionData.id || '',
        nombre: promocionData.nombre || '',
        descripcion: promocionData.descripcion || '',
        fechaInicio: new Date(promocionData.fechaInicio),
        fechaFinal: new Date(promocionData.fechaFinal),
        tipoPromocion: promocionData.tipoPromocion || ''
      })) as PromocionesModel[];
  
    } catch (error) {
      console.error('Error al obtener promociones: ', error);
      this.promociones = [];
    }
  }

  async addPromocion() {
    try {
      // Convertir fechas de string a Date si es necesario
      this.promocion.fechaInicio = new Date(this.promocion.fechaInicio);
      this.promocion.fechaFinal = new Date(this.promocion.fechaFinal);

      if (this.promocion.id) {
        await this.promocionesService.modificarPromocion(this.promocion);
        Swal.fire('Actualizado', 'Promoción actualizada correctamente.', 'success');
      } else {
        await this.promocionesService.agregarPromocion(this.promocion);
        Swal.fire('Agregado', 'Promoción agregada correctamente.', 'success');
      }

      this.promocion = new PromocionesModel();
      this.getElements();
    } catch (error) {
      console.error('Error al guardar la promoción: ', error);
      Swal.fire('Error', 'Hubo un problema al guardar la promoción.', 'error');
    }
  }

  updatePromocion() {
    const promocionActualizada = {
      ...this.promocion,
      fechaInicio: new Date(this.promocion.fechaInicio),
      fechaFinal: new Date(this.promocion.fechaFinal)
    };
  
    this.promocionesService.modificarPromocion(promocionActualizada)
      .then(() => {
      })
      .catch(err => console.error(err));
  }

  deletePromocion(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la promoción permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.promocionesService.eliminarPromocion(id)
          .then(() => {
            this.getElements();
            Swal.fire('Eliminado', 'Promoción eliminada correctamente.', 'success');
          })
          .catch(error => {
            console.error('Error al eliminar la promoción', error);
            Swal.fire('Error', 'No se pudo eliminar la promoción.', 'error');
          });
      }
    });
  }

  editPromocion(promo: PromocionesModel) {
    this.promocion = {
      ...promo,
    };
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}