import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {TipoTransaccion} from './tipo-transaccion.model';
import {DetalleVehiculo} from './detalle-vehiculo.model';
import {Marca} from './marca.model';
import {FotoVehiculo} from './foto-vehiculo.model';
import {CatalogoVehiculo} from './catalogo-vehiculo.model';

@model()
export class Vehiculo extends Entity {
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
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  kilometraje: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: string;

  @belongsTo(() => TipoTransaccion)
  tipoTransaccionId: string;

  @hasMany(() => DetalleVehiculo)
  detalleVehiculos: DetalleVehiculo[];

  @belongsTo(() => Marca)
  marcaId: string;

  @hasMany(() => FotoVehiculo)
  fotoVehiculos: FotoVehiculo[];

  @belongsTo(() => CatalogoVehiculo)
  catalogoVehiculoId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
