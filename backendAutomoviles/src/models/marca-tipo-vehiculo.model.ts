import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {CatalogoVehiculo} from './catalogo-vehiculo.model';

@model()
export class MarcaTipoVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Marca)
  marcaId: string;

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: string;

  @hasMany(() => CatalogoVehiculo)
  catalogoVehiculos: CatalogoVehiculo[];

  constructor(data?: Partial<MarcaTipoVehiculo>) {
    super(data);
  }
}

export interface MarcaTipoVehiculoRelations {
  // describe navigational properties here
}

export type MarcaTipoVehiculoWithRelations = MarcaTipoVehiculo & MarcaTipoVehiculoRelations;
