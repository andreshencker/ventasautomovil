import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {MarcaTipoVehiculo} from './marca-tipo-vehiculo.model';
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
  nombre: string;

  @belongsTo(() => MarcaTipoVehiculo)
  marcaTipoVehiculoId: string;

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
