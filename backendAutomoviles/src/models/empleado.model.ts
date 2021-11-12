import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {CargoEmpleado} from './cargo-empleado.model';
import {DetalleVehiculo} from './detalle-vehiculo.model';
import {EstudioSolicitud} from './estudio-solicitud.model';

@model()
export class Empleado extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
  })
  contrasena?: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @belongsTo(() => CargoEmpleado)
  cargoEmpleadoId: string;

  @hasMany(() => DetalleVehiculo)
  detalleVehiculos: DetalleVehiculo[];

  @hasMany(() => EstudioSolicitud)
  estudioSolicituds: EstudioSolicitud[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
