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
  Empleado,
  DetalleVehiculo,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoDetalleVehiculoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Empleado has many DetalleVehiculo',
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
    return this.empleadoRepository.detalleVehiculos(id).find(filter);
  }

  @post('/empleados/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVehiculo, {
            title: 'NewDetalleVehiculoInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) detalleVehiculo: Omit<DetalleVehiculo, 'id'>,
  ): Promise<DetalleVehiculo> {
    return this.empleadoRepository.detalleVehiculos(id).create(detalleVehiculo);
  }

  @patch('/empleados/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Empleado.DetalleVehiculo PATCH success count',
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
    return this.empleadoRepository.detalleVehiculos(id).patch(detalleVehiculo, where);
  }

  @del('/empleados/{id}/detalle-vehiculos', {
    responses: {
      '200': {
        description: 'Empleado.DetalleVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleVehiculo)) where?: Where<DetalleVehiculo>,
  ): Promise<Count> {
    return this.empleadoRepository.detalleVehiculos(id).delete(where);
  }
}
