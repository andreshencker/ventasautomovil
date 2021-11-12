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
import {DetalleVehiculo} from '../models';
import {DetalleVehiculoRepository} from '../repositories';

export class DetalleVehiculoController {
  constructor(
    @repository(DetalleVehiculoRepository)
    public detalleVehiculoRepository : DetalleVehiculoRepository,
  ) {}

  @post('/detalle-vehiculos')
  @response(200, {
    description: 'DetalleVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetalleVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {
            title: 'NewDetalleVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    detalleVehiculo: Omit<DetalleVehiculo, 'id'>,
  ): Promise<DetalleVehiculo> {
    return this.detalleVehiculoRepository.create(detalleVehiculo);
  }

  @get('/detalle-vehiculos/count')
  @response(200, {
    description: 'DetalleVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetalleVehiculo) where?: Where<DetalleVehiculo>,
  ): Promise<Count> {
    return this.detalleVehiculoRepository.count(where);
  }

  @get('/detalle-vehiculos')
  @response(200, {
    description: 'Array of DetalleVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetalleVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetalleVehiculo) filter?: Filter<DetalleVehiculo>,
  ): Promise<DetalleVehiculo[]> {
    return this.detalleVehiculoRepository.find(filter);
  }

  @patch('/detalle-vehiculos')
  @response(200, {
    description: 'DetalleVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {partial: true}),
        },
      },
    })
    detalleVehiculo: DetalleVehiculo,
    @param.where(DetalleVehiculo) where?: Where<DetalleVehiculo>,
  ): Promise<Count> {
    return this.detalleVehiculoRepository.updateAll(detalleVehiculo, where);
  }

  @get('/detalle-vehiculos/{id}')
  @response(200, {
    description: 'DetalleVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetalleVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetalleVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleVehiculo>
  ): Promise<DetalleVehiculo> {
    return this.detalleVehiculoRepository.findById(id, filter);
  }

  @patch('/detalle-vehiculos/{id}')
  @response(204, {
    description: 'DetalleVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {partial: true}),
        },
      },
    })
    detalleVehiculo: DetalleVehiculo,
  ): Promise<void> {
    await this.detalleVehiculoRepository.updateById(id, detalleVehiculo);
  }

  @put('/detalle-vehiculos/{id}')
  @response(204, {
    description: 'DetalleVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detalleVehiculo: DetalleVehiculo,
  ): Promise<void> {
    await this.detalleVehiculoRepository.replaceById(id, detalleVehiculo);
  }

  @del('/detalle-vehiculos/{id}')
  @response(204, {
    description: 'DetalleVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detalleVehiculoRepository.deleteById(id);
  }
}
