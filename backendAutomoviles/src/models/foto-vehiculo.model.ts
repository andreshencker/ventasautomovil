import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class FotoVehiculo extends Entity {
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
  nombre: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  constructor(data?: Partial<FotoVehiculo>) {
    super(data);
  }
}

export interface FotoVehiculoRelations {
  // describe navigational properties here
}

export type FotoVehiculoWithRelations = FotoVehiculo & FotoVehiculoRelations;
