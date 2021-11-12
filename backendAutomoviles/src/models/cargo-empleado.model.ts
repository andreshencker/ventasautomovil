import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class CargoEmpleado extends Entity {
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
  cargoEmpleado: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<CargoEmpleado>) {
    super(data);
  }
}

export interface CargoEmpleadoRelations {
  // describe navigational properties here
}

export type CargoEmpleadoWithRelations = CargoEmpleado & CargoEmpleadoRelations;
