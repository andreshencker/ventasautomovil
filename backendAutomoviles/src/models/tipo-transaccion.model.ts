import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class TipoTransaccion extends Entity {
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
  tipoTransaccion: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<TipoTransaccion>) {
    super(data);
  }
}

export interface TipoTransaccionRelations {
  // describe navigational properties here
}

export type TipoTransaccionWithRelations = TipoTransaccion & TipoTransaccionRelations;
