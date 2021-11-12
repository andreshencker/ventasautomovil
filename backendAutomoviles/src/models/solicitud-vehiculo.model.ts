import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {EstadoContrato} from './estado-contrato.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {EstudioSolicitud} from './estudio-solicitud.model';

@model()
export class SolicitudVehiculo extends Entity {
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
  fechaSolicitud: string;

  @property({
    type: 'object'   
  })
  contrato: object;

  @belongsTo(() => EstadoContrato)
  estadoContratoId: string;

  @belongsTo(() => EstadoSolicitud)
  estadoSolicitudId: string;

  @hasMany(() => EstudioSolicitud)
  estudioSolicituds: EstudioSolicitud[];

  constructor(data?: Partial<SolicitudVehiculo>) {
    super(data);
  }
}

export interface SolicitudVehiculoRelations {
  // describe navigational properties here
}

export type SolicitudVehiculoWithRelations = SolicitudVehiculo & SolicitudVehiculoRelations;
