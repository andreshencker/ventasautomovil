import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Vehiculo} from './vehiculo.model';
import {Ciudad} from './ciudad.model';

@model()
export class DetalleVehiculo extends Entity {
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
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

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

  @property({
    type: 'number',
    required: true,
  })
  porComision: number;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoVehiculo: boolean;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  constructor(data?: Partial<DetalleVehiculo>) {
    super(data);
  }
}

export interface DetalleVehiculoRelations {
  // describe navigational properties here
}

export type DetalleVehiculoWithRelations = DetalleVehiculo & DetalleVehiculoRelations;
