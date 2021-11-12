import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<TipoTransaccion>) {
    super(data);
  }
}

export interface TipoTransaccionRelations {
  // describe navigational properties here
}

export type TipoTransaccionWithRelations = TipoTransaccion & TipoTransaccionRelations;
