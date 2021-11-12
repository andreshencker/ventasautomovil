import {Entity, model, property} from '@loopback/repository';

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
    type: 'object',
    required: true,
  })
  contrato: object;

  constructor(data?: Partial<SolicitudVehiculo>) {
    super(data);
  }
}

export interface SolicitudVehiculoRelations {
  // describe navigational properties here
}

export type SolicitudVehiculoWithRelations = SolicitudVehiculo & SolicitudVehiculoRelations;
