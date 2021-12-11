import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {MarcaTipoVehiculo} from './marca-tipo-vehiculo.model';

@model()
export class TipoVehiculo extends Entity {
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
  tipoVehiculo: string;

  @hasMany(() => MarcaTipoVehiculo)
  marcaTipoVehiculos: MarcaTipoVehiculo[];

  constructor(data?: Partial<TipoVehiculo>) {
    super(data);
  }
}

export interface TipoVehiculoRelations {
  // describe navigational properties here
}

export type TipoVehiculoWithRelations = TipoVehiculo & TipoVehiculoRelations;
