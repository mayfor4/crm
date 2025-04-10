import { Injectable, inject } from '@angular/core';
import { Frecuente } from '../models/frecuentes.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  getFrecuentes(){
    const clienteFrecuentesCollection = collection(this.db, 'clientesFrecuentes');
    return collectionData((clienteFrecuentesCollection), {idField: 'id'}).pipe(first())
  }
}
