import { Injectable, inject } from '@angular/core';
import { collection, collectionData, doc, deleteDoc, docData, Firestore, addDoc, updateDoc, Timestamp } from '@angular/fire/firestore';
import { PromocionesModel } from '../models/promociones.model';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';
import { first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  private db: Firestore = inject(Firestore);

  private formatFecha(fecha: Date | undefined): string {
    if (!fecha) return '';
    return fecha.toISOString().substring(0, 10); // formato yyyy-MM-dd
  }

  constructor() {}

  getPromociones() {
    const promocionesCollection = collection(this.db, 'promociones');
    return collectionData(promocionesCollection, { idField: 'id' }).pipe(
      map(promociones =>
        promociones.map(promocion => ({
          ...promocion,
          fechaInicio: this.formatFecha((promocion['fechaInicio'] as Timestamp)?.toDate()),
          fechaFinal: this.formatFecha((promocion['fechaFinal'] as Timestamp)?.toDate())
        }))
      ),
      first()
    );
  }

  agregarPromocion(promocion: PromocionesModel) {
    const promocionesCollection = collection(this.db, 'promociones');
    
    const promocionesData = {
      nombre: promocion.nombre,
      descripcion: promocion.descripcion,
      fechaInicio: new Date(promocion.fechaInicio),
      fechaFinal: new Date(promocion.fechaFinal),
      tipoPromocion: promocion.tipoPromocion
    };
  
    return addDoc(promocionesCollection, promocionesData);
  }

  modificarPromocion(promocion: PromocionesModel){
    const documentRef = doc(this.db, 'promociones', promocion.id);
    return updateDoc(documentRef, {
      id: promocion.id,
      nombre: promocion.nombre,
      descrpcion: promocion.descripcion,
      fechaInicio: promocion.fechaInicio,
      fechaFinal: promocion.fechaFinal,
      tipoPromocion: promocion.tipoPromocion
    });
  }

  eliminarPromocion(id: string) {
    const documentRef = doc(this.db, 'promociones', id);
    return deleteDoc(documentRef);
  }

  convertirFecha(fecha: any): string {
    if (fecha?.toDate) {
      const d = fecha.toDate();
      return d.toISOString().substring(0, 10);
    } else if (fecha instanceof Date) {
      return fecha.toISOString().substring(0, 10);
    } else if (typeof fecha === 'string') {
      return fecha;
    }
    return '';
  }

}
