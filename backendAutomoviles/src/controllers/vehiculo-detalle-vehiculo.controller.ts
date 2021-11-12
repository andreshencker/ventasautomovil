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
  Vehiculo,
  DetalleVehiculo,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoDetalleVehiculoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many DetalleVehiculo',
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
    return this.vehiculoRepository.detalleVehiculos(id).find(filter);
  }

  @post('/vehiculos/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {
            title: 'NewDetalleVehiculoInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) detalleVehiculo: Omit<DetalleVehiculo, 'id'>,
  ): Promise<DetalleVehiculo> {
    return this.vehiculoRepository.detalleVehiculos(id).create(detalleVehiculo);
  }

  @patch('/vehiculos/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo.DetalleVehiculo PATCH success count',
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
    return this.vehiculoRepository.detalleVehiculos(id).patch(detalleVehiculo, where);
  }

  @del('/vehiculos/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo.DetalleVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleVehiculo)) where?: Where<DetalleVehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.detalleVehiculos(id).delete(where);
  }
}
