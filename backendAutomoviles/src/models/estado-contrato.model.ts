import {Entity, model, property, hasMany} from '@loopback/repository';
import {SolicitudVehiculo} from './solicitud-vehiculo.model';

@model()
export class EstadoContrato extends Entity {
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
  estadoContrato: string;

  @hasMany(() => SolicitudVehiculo)
  solicitudVehiculos: SolicitudVehiculo[];

  constructor(data?: Partial<EstadoContrato>) {
    super(data);
  }
}

export interface EstadoContratoRelations {
  // describe navigational properties here
}

export type EstadoContratoWithRelations = EstadoContrato & EstadoContratoRelations;
