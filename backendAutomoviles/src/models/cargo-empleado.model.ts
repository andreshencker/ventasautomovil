import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<CargoEmpleado>) {
    super(data);
  }
}

export interface CargoEmpleadoRelations {
  // describe navigational properties here
}

export type CargoEmpleadoWithRelations = CargoEmpleado & CargoEmpleadoRelations;
