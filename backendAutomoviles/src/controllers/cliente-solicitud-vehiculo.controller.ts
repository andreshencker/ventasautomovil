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
  Cliente,
  SolicitudVehiculo,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteSolicitudVehiculoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudVehiculo>,
  ): Promise<SolicitudVehiculo[]> {
    return this.clienteRepository.solicitudVehiculos(id).find(filter);
  }

  @post('/clientes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {
            title: 'NewSolicitudVehiculoInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudVehiculo: Omit<SolicitudVehiculo, 'id'>,
  ): Promise<SolicitudVehiculo> {
    return this.clienteRepository.solicitudVehiculos(id).create(solicitudVehiculo);
  }

  @patch('/clientes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {partial: true}),
        },
      },
    })
    solicitudVehiculo: Partial<SolicitudVehiculo>,
    @param.query.object('where', getWhereSchemaFor(SolicitudVehiculo)) where?: Where<SolicitudVehiculo>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudVehiculos(id).patch(solicitudVehiculo, where);
  }

  @del('/clientes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVehiculo)) where?: Where<SolicitudVehiculo>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudVehiculos(id).delete(where);
  }
}
