import { Injectable, Inject, inject } from '@angular/core';
import { EventModel } from '../models/events.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, Timestamp, getDoc, updateDoc } from '@angular/fire/firestore';
import { first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  getEvents() {
    const eventsCollection = collection(this.db, 'events');
      return collectionData(eventsCollection, { idField: 'id' }).pipe(
        map(events => events.map(event => ({
          ...event,
          inicio: (event['inicio'] as Timestamp)?.toDate(),
          final: (event['final'] as Timestamp)?.toDate() 
        }))),
        first()
    );
  }

  async addEvent(event: EventModel): Promise<void> {
    const eventsCollection = collection(this.db, 'events');
    await addDoc(eventsCollection, event);
  }

  async getEventById(eventId: string): Promise<any> {
    const eventRef = doc(this.db, 'events', eventId);
    const snapshot = await getDoc(eventRef);
  
    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        ...data,
        id: snapshot.id,
        inicio: (data['inicio'] as Timestamp)?.toDate(),
        final: (data['final'] as Timestamp)?.toDate()
      };
    } else {
      throw new Error('Evento no encontrado');
    }
  }

  async updateEvent(eventId: string, updatedEvent: EventModel): Promise<void> {
    const eventRef = doc(this.db, 'events', eventId);
    await updateDoc(eventRef, {
      ...updatedEvent,
      inicio: Timestamp.fromDate(new Date(updatedEvent.inicio)),
      final: Timestamp.fromDate(new Date(updatedEvent.final))
    });
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      const eventDocRef = doc(this.db, 'events', eventId);
      await deleteDoc(eventDocRef);
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      throw error;
    }
  }

}
