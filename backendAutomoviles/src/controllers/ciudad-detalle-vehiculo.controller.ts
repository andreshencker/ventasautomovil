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
  Ciudad,
  DetalleVehiculo,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadDetalleVehiculoController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many DetalleVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleVehiculo>,
  ): Promise<DetalleVehiculo[]> {
    return this.ciudadRepository.detalleVehiculos(id).find(filter);
  }

  @post('/ciudads/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {
            title: 'NewDetalleVehiculoInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) detalleVehiculo: Omit<DetalleVehiculo, 'id'>,
  ): Promise<DetalleVehiculo> {
    return this.ciudadRepository.detalleVehiculos(id).create(detalleVehiculo);
  }

  @patch('/ciudads/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Ciudad.DetalleVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {partial: true}),
        },
      },
    })
    detalleVehiculo: Partial<DetalleVehiculo>,
    @param.query.object('where', getWhereSchemaFor(DetalleVehiculo)) where?: Where<DetalleVehiculo>,
  ): Promise<Count> {
    return this.ciudadRepository.detalleVehiculos(id).patch(detalleVehiculo, where);
  }

  @del('/ciudads/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Ciudad.DetalleVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleVehiculo)) where?: Where<DetalleVehiculo>,
  ): Promise<Count> {
    return this.ciudadRepository.detalleVehiculos(id).delete(where);
  }
}
