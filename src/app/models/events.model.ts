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
}