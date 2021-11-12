import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoTransaccion,
  Vehiculo,
} from '../models';
import {TipoTransaccionRepository} from '../repositories';

export class TipoTransaccionVehiculoController {
  constructor(
    @repository(TipoTransaccionRepository) protected tipoTransaccionRepository: TipoTransaccionRepository,
  ) { }

  @get('/tipo-transaccions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of TipoTransaccion has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.tipoTransaccionRepository.vehiculos(id).find(filter);
  }

  @post('/tipo-transaccions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoTransaccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoTransaccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInTipoTransaccion',
            exclude: ['id'],
            optional: ['tipoTransaccionId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.tipoTransaccionRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/tipo-transaccions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoTransaccion.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.tipoTransaccionRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/tipo-transaccions/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoTransaccion.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.tipoTransaccionRepository.vehiculos(id).delete(where);
  }
}
