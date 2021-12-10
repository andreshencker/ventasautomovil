import {Model, model, property} from '@loopback/repository';

@model()
export class Contacto extends Model {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  nombres: string;
  @property({
    type: 'string',
    id: true,
    generated: false,
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
    required: true,
  })
  mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoTransaccion: string;


  constructor(data?: Partial<Contacto>) {
    super(data);
  }
}

export interface ContactoRelations {
  // describe navigational properties here
}

export type ContactoWithRelations = Contacto & ContactoRelations;
