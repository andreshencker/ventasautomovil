import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoTransaccion} from '../models';
import {TipoTransaccionRepository} from '../repositories';

export class TipoTransaccionController {
  constructor(
    @repository(TipoTransaccionRepository)
    public tipoTransaccionRepository : TipoTransaccionRepository,
  ) {}

  @post('/tipo-transaccions')
  @response(200, {
    description: 'TipoTransaccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoTransaccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransaccion, {
            title: 'NewTipoTransaccion',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoTransaccion: Omit<TipoTransaccion, 'id'>,
  ): Promise<TipoTransaccion> {
    return this.tipoTransaccionRepository.create(tipoTransaccion);
  }

  @get('/tipo-transaccions/count')
  @response(200, {
    description: 'TipoTransaccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoTransaccion) where?: Where<TipoTransaccion>,
  ): Promise<Count> {
    return this.tipoTransaccionRepository.count(where);
  }

  @get('/tipo-transaccions')
  @response(200, {
    description: 'Array of TipoTransaccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoTransaccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoTransaccion) filter?: Filter<TipoTransaccion>,
  ): Promise<TipoTransaccion[]> {
    return this.tipoTransaccionRepository.find(filter);
  }

  @patch('/tipo-transaccions')
  @response(200, {
    description: 'TipoTransaccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransaccion, {partial: true}),
        },
      },
    })
    tipoTransaccion: TipoTransaccion,
    @param.where(TipoTransaccion) where?: Where<TipoTransaccion>,
  ): Promise<Count> {
    return this.tipoTransaccionRepository.updateAll(tipoTransaccion, where);
  }

  @get('/tipo-transaccions/{id}')
  @response(200, {
    description: 'TipoTransaccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoTransaccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoTransaccion, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoTransaccion>
  ): Promise<TipoTransaccion> {
    return this.tipoTransaccionRepository.findById(id, filter);
  }

  @patch('/tipo-transaccions/{id}')
  @response(204, {
    description: 'TipoTransaccion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTransaccion, {partial: true}),
        },
      },
    })
    tipoTransaccion: TipoTransaccion,
  ): Promise<void> {
    await this.tipoTransaccionRepository.updateById(id, tipoTransaccion);
  }

  @put('/tipo-transaccions/{id}')
  @response(204, {
    description: 'TipoTransaccion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoTransaccion: TipoTransaccion,
  ): Promise<void> {
    await this.tipoTransaccionRepository.replaceById(id, tipoTransaccion);
  }

  @del('/tipo-transaccions/{id}')
  @response(204, {
    description: 'TipoTransaccion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoTransaccionRepository.deleteById(id);
  }
}
