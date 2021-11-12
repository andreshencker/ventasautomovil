import {Entity, model, property} from '@loopback/repository';

@model()
export class EstudioSolicitud extends Entity {
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
  fechaEstudio: string;

  @property({
    type: 'string',
  })
  comentario?: string;


  constructor(data?: Partial<EstudioSolicitud>) {
    super(data);
  }
}

export interface EstudioSolicitudRelations {
  // describe navigational properties here
}

export type EstudioSolicitudWithRelations = EstudioSolicitud & EstudioSolicitudRelations;
