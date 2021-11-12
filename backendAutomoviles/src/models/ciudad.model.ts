import {Entity, model, property, hasMany} from '@loopback/repository';
import {DetalleVehiculo} from './detalle-vehiculo.model';

@model()
export class Ciudad extends Entity {
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
  ciudad: string;

  @hasMany(() => DetalleVehiculo)
  detalleVehiculos: DetalleVehiculo[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
