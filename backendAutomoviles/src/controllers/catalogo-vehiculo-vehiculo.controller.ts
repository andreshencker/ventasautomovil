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
  CatalogoVehiculo,
  Vehiculo,
} from '../models';
import {CatalogoVehiculoRepository} from '../repositories';

export class CatalogoVehiculoVehiculoController {
  constructor(
    @repository(CatalogoVehiculoRepository) protected catalogoVehiculoRepository: CatalogoVehiculoRepository,
  ) { }

  @get('/catalogo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of CatalogoVehiculo has many Vehiculo',
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
    return this.catalogoVehiculoRepository.vehiculos(id).find(filter);
  }

  @post('/catalogo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CatalogoVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CatalogoVehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInCatalogoVehiculo',
            exclude: ['id'],
            optional: ['catalogoVehiculoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.catalogoVehiculoRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/catalogo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CatalogoVehiculo.Vehiculo PATCH success count',
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
    return this.catalogoVehiculoRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/catalogo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'CatalogoVehiculo.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.catalogoVehiculoRepository.vehiculos(id).delete(where);
  }
}
