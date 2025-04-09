export class EventModel {
    id!: string;
    nombre!: string;
    estado!: string;
    tipo!: string;
    inicio!: Date;
    final!: Date;
    participantes!: number;
    confirmados!: number;
    participaciones!: number;
    noParticipaciones!: number;
    meta!: string;
    estrategia!: string;
    presupuestoEsperado!: number;
    costoReal!: number;
    ingresoEsperado!: number;
    ingresoObtenido!: number;
}
export class MensajeModel{
    id!: string;
  emisor!: string;
  receptor!: string;
  contenido!: string;
  fecha!: string;
}