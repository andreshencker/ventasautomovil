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
import {SolicitudVehiculo} from '../models';
import {SolicitudVehiculoRepository} from '../repositories';

export class SolicitudVehiculoController {
  constructor(
    @repository(SolicitudVehiculoRepository)
    public solicitudVehiculoRepository : SolicitudVehiculoRepository,
  ) {}

  @post('/solicitud-vehiculos')
  @response(200, {
    description: 'SolicitudVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {
            title: 'NewSolicitudVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudVehiculo: Omit<SolicitudVehiculo, 'id'>,
  ): Promise<SolicitudVehiculo> {
    return this.solicitudVehiculoRepository.create(solicitudVehiculo);
  }

  @get('/solicitud-vehiculos/count')
  @response(200, {
    description: 'SolicitudVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudVehiculo) where?: Where<SolicitudVehiculo>,
  ): Promise<Count> {
    return this.solicitudVehiculoRepository.count(where);
  }

  @get('/solicitud-vehiculos')
  @response(200, {
    description: 'Array of SolicitudVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudVehiculo) filter?: Filter<SolicitudVehiculo>,
  ): Promise<SolicitudVehiculo[]> {
    return this.solicitudVehiculoRepository.find(filter);
  }

  @patch('/solicitud-vehiculos')
  @response(200, {
    description: 'SolicitudVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {partial: true}),
        },
      },
    })
    solicitudVehiculo: SolicitudVehiculo,
    @param.where(SolicitudVehiculo) where?: Where<SolicitudVehiculo>,
  ): Promise<Count> {
    return this.solicitudVehiculoRepository.updateAll(solicitudVehiculo, where);
  }

  @get('/solicitud-vehiculos/{id}')
  @response(200, {
    description: 'SolicitudVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudVehiculo>
  ): Promise<SolicitudVehiculo> {
    return this.solicitudVehiculoRepository.findById(id, filter);
  }

  @patch('/solicitud-vehiculos/{id}')
  @response(204, {
    description: 'SolicitudVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {partial: true}),
        },
      },
    })
    solicitudVehiculo: SolicitudVehiculo,
  ): Promise<void> {
    await this.solicitudVehiculoRepository.updateById(id, solicitudVehiculo);
  }

  @put('/solicitud-vehiculos/{id}')
  @response(204, {
    description: 'SolicitudVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudVehiculo: SolicitudVehiculo,
  ): Promise<void> {
    await this.solicitudVehiculoRepository.replaceById(id, solicitudVehiculo);
  }

  @del('/solicitud-vehiculos/{id}')
  @response(204, {
    description: 'SolicitudVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudVehiculoRepository.deleteById(id);
  }
}
