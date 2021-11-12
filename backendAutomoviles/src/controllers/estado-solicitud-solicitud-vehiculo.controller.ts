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
  EstadoSolicitud,
  SolicitudVehiculo,
} from '../models';
import {EstadoSolicitudRepository} from '../repositories';

export class EstadoSolicitudSolicitudVehiculoController {
  constructor(
    @repository(EstadoSolicitudRepository) protected estadoSolicitudRepository: EstadoSolicitudRepository,
  ) { }

  @get('/estado-solicituds/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'Array of EstadoSolicitud has many SolicitudVehiculo',
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
    return this.estadoSolicitudRepository.solicitudVehiculos(id).find(filter);
  }

  @post('/estado-solicituds/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'EstadoSolicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EstadoSolicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {
            title: 'NewSolicitudVehiculoInEstadoSolicitud',
            exclude: ['id'],
            optional: ['estadoSolicitudId']
          }),
        },
      },
    }) solicitudVehiculo: Omit<SolicitudVehiculo, 'id'>,
  ): Promise<SolicitudVehiculo> {
    return this.estadoSolicitudRepository.solicitudVehiculos(id).create(solicitudVehiculo);
  }

  @patch('/estado-solicituds/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.SolicitudVehiculo PATCH success count',
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
    return this.estadoSolicitudRepository.solicitudVehiculos(id).patch(solicitudVehiculo, where);
  }

  @del('/estado-solicituds/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'EstadoSolicitud.SolicitudVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVehiculo)) where?: Where<SolicitudVehiculo>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.solicitudVehiculos(id).delete(where);
  }
}
