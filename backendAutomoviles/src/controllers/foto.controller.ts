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
import {FotoVehiculo} from '../models';
import {FotoVehiculoRepository} from '../repositories';

export class FotoController {
  constructor(
    @repository(FotoVehiculoRepository)
    public fotoVehiculoRepository : FotoVehiculoRepository,
  ) {}

  @post('/foto-vehiculos')
  @response(200, {
    description: 'FotoVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(FotoVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoVehiculo, {
            title: 'NewFotoVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    fotoVehiculo: Omit<FotoVehiculo, 'id'>,
  ): Promise<FotoVehiculo> {
    return this.fotoVehiculoRepository.create(fotoVehiculo);
  }

  @get('/foto-vehiculos/count')
  @response(200, {
    description: 'FotoVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FotoVehiculo) where?: Where<FotoVehiculo>,
  ): Promise<Count> {
    return this.fotoVehiculoRepository.count(where);
  }

  @get('/foto-vehiculos')
  @response(200, {
    description: 'Array of FotoVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FotoVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FotoVehiculo) filter?: Filter<FotoVehiculo>,
  ): Promise<FotoVehiculo[]> {
    return this.fotoVehiculoRepository.find(filter);
  }

  @patch('/foto-vehiculos')
  @response(200, {
    description: 'FotoVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoVehiculo, {partial: true}),
        },
      },
    })
    fotoVehiculo: FotoVehiculo,
    @param.where(FotoVehiculo) where?: Where<FotoVehiculo>,
  ): Promise<Count> {
    return this.fotoVehiculoRepository.updateAll(fotoVehiculo, where);
  }

  @get('/foto-vehiculos/{id}')
  @response(200, {
    description: 'FotoVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FotoVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FotoVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<FotoVehiculo>
  ): Promise<FotoVehiculo> {
    return this.fotoVehiculoRepository.findById(id, filter);
  }

  @patch('/foto-vehiculos/{id}')
  @response(204, {
    description: 'FotoVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoVehiculo, {partial: true}),
        },
      },
    })
    fotoVehiculo: FotoVehiculo,
  ): Promise<void> {
    await this.fotoVehiculoRepository.updateById(id, fotoVehiculo);
  }

  @put('/foto-vehiculos/{id}')
  @response(204, {
    description: 'FotoVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fotoVehiculo: FotoVehiculo,
  ): Promise<void> {
    await this.fotoVehiculoRepository.replaceById(id, fotoVehiculo);
  }

  @del('/foto-vehiculos/{id}')
  @response(204, {
    description: 'FotoVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fotoVehiculoRepository.deleteById(id);
  }
}
