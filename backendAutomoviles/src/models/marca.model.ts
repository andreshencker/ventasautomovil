import {Entity, model, property, hasMany} from '@loopback/repository';
import {MarcaTipoVehiculo} from './marca-tipo-vehiculo.model';

@model()
export class Marca extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',

  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @hasMany(() => MarcaTipoVehiculo)
  marcaTipoVehiculos: MarcaTipoVehiculo[];

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
