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

export class Client {
  id!: string;
  nombre!: string;
  telefono!: string;
  correo!: string;
  direccion!: string;
  edad!: number;
  sexo!: string;
  nivelEstudios!: string;
  ocupacion!: string;
  asistenciaEventos!: string;
  compras!: number[];
  promociones!: string;
  nivelLealtad!: string;
}