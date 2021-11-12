import {Entity, model, property, hasMany} from '@loopback/repository';
import {SolicitudVehiculo} from './solicitud-vehiculo.model';

@model()
export class EstadoSolicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoSolicitud: string;

  @hasMany(() => SolicitudVehiculo)
  solicitudVehiculos: SolicitudVehiculo[];

  constructor(data?: Partial<EstadoSolicitud>) {
    super(data);
  }
}

export interface EstadoSolicitudRelations {
  // describe navigational properties here
}

export type EstadoSolicitudWithRelations = EstadoSolicitud & EstadoSolicitudRelations;
