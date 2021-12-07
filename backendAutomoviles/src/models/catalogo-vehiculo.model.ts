import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class CatalogoVehiculo extends Entity {
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
  nombreVehiculo: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<CatalogoVehiculo>) {
    super(data);
  }
}

export interface CatalogoVehiculoRelations {
  // describe navigational properties here
}

export type CatalogoVehiculoWithRelations = CatalogoVehiculo & CatalogoVehiculoRelations;
