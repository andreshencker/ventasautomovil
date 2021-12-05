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
import {CatalogoVehiculo} from '../models';
import {CatalogoVehiculoRepository} from '../repositories';

export class CatalogoVehiculoController {
  constructor(
    @repository(CatalogoVehiculoRepository)
    public catalogoVehiculoRepository : CatalogoVehiculoRepository,
  ) {}

  @post('/catalogo-vehiculos')
  @response(200, {
    description: 'CatalogoVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(CatalogoVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoVehiculo, {
            title: 'NewCatalogoVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    catalogoVehiculo: Omit<CatalogoVehiculo, 'id'>,
  ): Promise<CatalogoVehiculo> {
    return this.catalogoVehiculoRepository.create(catalogoVehiculo);
  }

  @get('/catalogo-vehiculos/count')
  @response(200, {
    description: 'CatalogoVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CatalogoVehiculo) where?: Where<CatalogoVehiculo>,
  ): Promise<Count> {
    return this.catalogoVehiculoRepository.count(where);
  }

  @get('/catalogo-vehiculos')
  @response(200, {
    description: 'Array of CatalogoVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CatalogoVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CatalogoVehiculo) filter?: Filter<CatalogoVehiculo>,
  ): Promise<CatalogoVehiculo[]> {
    return this.catalogoVehiculoRepository.find(filter);
  }

  @patch('/catalogo-vehiculos')
  @response(200, {
    description: 'CatalogoVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoVehiculo, {partial: true}),
        },
      },
    })
    catalogoVehiculo: CatalogoVehiculo,
    @param.where(CatalogoVehiculo) where?: Where<CatalogoVehiculo>,
  ): Promise<Count> {
    return this.catalogoVehiculoRepository.updateAll(catalogoVehiculo, where);
  }

  @get('/catalogo-vehiculos/{id}')
  @response(200, {
    description: 'CatalogoVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CatalogoVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CatalogoVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<CatalogoVehiculo>
  ): Promise<CatalogoVehiculo> {
    return this.catalogoVehiculoRepository.findById(id, filter);
  }

  @patch('/catalogo-vehiculos/{id}')
  @response(204, {
    description: 'CatalogoVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoVehiculo, {partial: true}),
        },
      },
    })
    catalogoVehiculo: CatalogoVehiculo,
  ): Promise<void> {
    await this.catalogoVehiculoRepository.updateById(id, catalogoVehiculo);
  }

  @put('/catalogo-vehiculos/{id}')
  @response(204, {
    description: 'CatalogoVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() catalogoVehiculo: CatalogoVehiculo,
  ): Promise<void> {
    await this.catalogoVehiculoRepository.replaceById(id, catalogoVehiculo);
  }

  @del('/catalogo-vehiculos/{id}')
  @response(204, {
    description: 'CatalogoVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.catalogoVehiculoRepository.deleteById(id);
  }
}
