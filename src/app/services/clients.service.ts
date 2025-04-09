import { Injectable, inject } from '@angular/core';
import { Client } from '../models/events.model';
import { collectionData, deleteDoc, Firestore } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private db: Firestore = inject(Firestore);

  constructor() {}

  getClients() {
    const clientsCollection = collection(this.db, 'clients');
    return collectionData(clientsCollection, { idField: 'id' }).pipe(first());
  }

  agregarClient(client: Client) {
    const clientsCollection = collection(this.db, 'clients');
    const clientData = {
      nombre: client.nombre,
      telefono: client.telefono,
      correo: client.correo,
      direccion: client.direccion,
      edad: client.edad,
      sexo: client.sexo,
      nivelEstudios: client.nivelEstudios,
      ocupacion: client.ocupacion,
      asistenciaEventos: client.asistenciaEventos,
      compras: client.compras,
      promociones: client.promociones,
      nivelLealtad: client.nivelLealtad
    };
    return addDoc(clientsCollection, clientData);
  }

  modificarClient(client: Client) {
    const documentRef = doc(this.db, 'clients', client.id);
    return updateDoc(documentRef, {
      nombre: client.nombre,
      telefono: client.telefono,
      correo: client.correo,
      direccion: client.direccion,
      edad: client.edad,
      sexo: client.sexo,
      nivelEstudios: client.nivelEstudios,
      ocupacion: client.ocupacion,
      asistenciaEventos: client.asistenciaEventos,
      compras: client.compras,
      promociones: client.promociones,
      nivelLealtad: client.nivelLealtad
    });
  }

  eliminarClient(client: Client) {
    const documentRef = doc(this.db, 'clients', client.id);
    return deleteDoc(documentRef);
  }
}