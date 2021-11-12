import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoContrato extends Entity {
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
  estadoContrato: string;


  constructor(data?: Partial<EstadoContrato>) {
    super(data);
  }
}

export interface EstadoContratoRelations {
  // describe navigational properties here
}

export type EstadoContratoWithRelations = EstadoContrato & EstadoContratoRelations;
