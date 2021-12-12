import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';


@model()
export class DetalleVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;



  @property({
    type: 'number',
    required: true,
  })
  entrada: number;

  @property({
    type: 'number',
    required: true,
  })
  salida: number;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;



  constructor(data?: Partial<DetalleVehiculo>) {
    super(data);
  }
}

export interface DetalleVehiculoRelations {
  // describe navigational properties here
}

export type DetalleVehiculoWithRelations = DetalleVehiculo & DetalleVehiculoRelations;
