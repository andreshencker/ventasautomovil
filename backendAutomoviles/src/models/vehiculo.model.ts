import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoTransaccion} from './tipo-transaccion.model';
import {DetalleVehiculo} from './detalle-vehiculo.model';
import {FotoVehiculo} from './foto-vehiculo.model';
import {Ciudad} from './ciudad.model';
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

 

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  porComision: number;




  @belongsTo(() => TipoTransaccion)
  tipoTransaccionId: string;

  @hasMany(() => DetalleVehiculo)
  detalleVehiculos: DetalleVehiculo[];


  @hasMany(() => FotoVehiculo)
  fotoVehiculos: FotoVehiculo[];

  @belongsTo(() => Ciudad)
  ciudadId: string;

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
