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
import {EstudioSolicitud} from '../models';
import {EstudioSolicitudRepository} from '../repositories';

export class EstudioSolicitudController {
  constructor(
    @repository(EstudioSolicitudRepository)
    public estudioSolicitudRepository : EstudioSolicitudRepository,
  ) {}

  @post('/estudio-solicituds')
  @response(200, {
    description: 'EstudioSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstudioSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {
            title: 'NewEstudioSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    estudioSolicitud: Omit<EstudioSolicitud, 'id'>,
  ): Promise<EstudioSolicitud> {
    return this.estudioSolicitudRepository.create(estudioSolicitud);
  }

  @get('/estudio-solicituds/count')
  @response(200, {
    description: 'EstudioSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstudioSolicitud) where?: Where<EstudioSolicitud>,
  ): Promise<Count> {
    return this.estudioSolicitudRepository.count(where);
  }

  @get('/estudio-solicituds')
  @response(200, {
    description: 'Array of EstudioSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstudioSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstudioSolicitud) filter?: Filter<EstudioSolicitud>,
  ): Promise<EstudioSolicitud[]> {
    return this.estudioSolicitudRepository.find(filter);
  }

  @patch('/estudio-solicituds')
  @response(200, {
    description: 'EstudioSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {partial: true}),
        },
      },
    })
    estudioSolicitud: EstudioSolicitud,
    @param.where(EstudioSolicitud) where?: Where<EstudioSolicitud>,
  ): Promise<Count> {
    return this.estudioSolicitudRepository.updateAll(estudioSolicitud, where);
  }

  @get('/estudio-solicituds/{id}')
  @response(200, {
    description: 'EstudioSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstudioSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstudioSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<EstudioSolicitud>
  ): Promise<EstudioSolicitud> {
    return this.estudioSolicitudRepository.findById(id, filter);
  }

  @patch('/estudio-solicituds/{id}')
  @response(204, {
    description: 'EstudioSolicitud PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {partial: true}),
        },
      },
    })
    estudioSolicitud: EstudioSolicitud,
  ): Promise<void> {
    await this.estudioSolicitudRepository.updateById(id, estudioSolicitud);
  }

  @put('/estudio-solicituds/{id}')
  @response(204, {
    description: 'EstudioSolicitud PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estudioSolicitud: EstudioSolicitud,
  ): Promise<void> {
    await this.estudioSolicitudRepository.replaceById(id, estudioSolicitud);
  }

  @del('/estudio-solicituds/{id}')
  @response(204, {
    description: 'EstudioSolicitud DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estudioSolicitudRepository.deleteById(id);
  }
}
