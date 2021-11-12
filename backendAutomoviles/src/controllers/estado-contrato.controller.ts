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
import {EstadoContrato} from '../models';
import {EstadoContratoRepository} from '../repositories';

export class EstadoContratoController {
  constructor(
    @repository(EstadoContratoRepository)
    public estadoContratoRepository : EstadoContratoRepository,
  ) {}

  @post('/estado-contratoes')
  @response(200, {
    description: 'EstadoContrato model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoContrato)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoContrato, {
            title: 'NewEstadoContrato',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoContrato: Omit<EstadoContrato, 'id'>,
  ): Promise<EstadoContrato> {
    return this.estadoContratoRepository.create(estadoContrato);
  }

  @get('/estado-contratoes/count')
  @response(200, {
    description: 'EstadoContrato model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoContrato) where?: Where<EstadoContrato>,
  ): Promise<Count> {
    return this.estadoContratoRepository.count(where);
  }

  @get('/estado-contratoes')
  @response(200, {
    description: 'Array of EstadoContrato model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoContrato, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoContrato) filter?: Filter<EstadoContrato>,
  ): Promise<EstadoContrato[]> {
    return this.estadoContratoRepository.find(filter);
  }

  @patch('/estado-contratoes')
  @response(200, {
    description: 'EstadoContrato PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoContrato, {partial: true}),
        },
      },
    })
    estadoContrato: EstadoContrato,
    @param.where(EstadoContrato) where?: Where<EstadoContrato>,
  ): Promise<Count> {
    return this.estadoContratoRepository.updateAll(estadoContrato, where);
  }

  @get('/estado-contratoes/{id}')
  @response(200, {
    description: 'EstadoContrato model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoContrato, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadoContrato, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoContrato>
  ): Promise<EstadoContrato> {
    return this.estadoContratoRepository.findById(id, filter);
  }

  @patch('/estado-contratoes/{id}')
  @response(204, {
    description: 'EstadoContrato PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoContrato, {partial: true}),
        },
      },
    })
    estadoContrato: EstadoContrato,
  ): Promise<void> {
    await this.estadoContratoRepository.updateById(id, estadoContrato);
  }

  @put('/estado-contratoes/{id}')
  @response(204, {
    description: 'EstadoContrato PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadoContrato: EstadoContrato,
  ): Promise<void> {
    await this.estadoContratoRepository.replaceById(id, estadoContrato);
  }

  @del('/estado-contratoes/{id}')
  @response(204, {
    description: 'EstadoContrato DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoContratoRepository.deleteById(id);
  }
}
