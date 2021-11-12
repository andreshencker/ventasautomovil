import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SolicitudVehiculo} from './solicitud-vehiculo.model';
import {Empleado} from './empleado.model';

@model()
export class EstudioSolicitud extends Entity {
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
  fechaEstudio: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @belongsTo(() => SolicitudVehiculo)
  solicitudVehiculoId: string; 

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<EstudioSolicitud>) {
    super(data);
  }
}

export interface EstudioSolicitudRelations {
  // describe navigational properties here
}

export type EstudioSolicitudWithRelations = EstudioSolicitud & EstudioSolicitudRelations;
