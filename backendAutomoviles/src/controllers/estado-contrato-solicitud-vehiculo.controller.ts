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
  EstadoContrato,
  SolicitudVehiculo,
} from '../models';
import {EstadoContratoRepository} from '../repositories';

export class EstadoContratoSolicitudVehiculoController {
  constructor(
    @repository(EstadoContratoRepository) protected estadoContratoRepository: EstadoContratoRepository,
  ) { }

  @get('/estado-contratoes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'Array of EstadoContrato has many SolicitudVehiculo',
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
    return this.estadoContratoRepository.solicitudVehiculos(id).find(filter);
  }

  @post('/estado-contratoes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'EstadoContrato model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EstadoContrato.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudVehiculo, {
            title: 'NewSolicitudVehiculoInEstadoContrato',
            exclude: ['id'],
            optional: ['estadoContratoId']
          }),
        },
      },
    }) solicitudVehiculo: Omit<SolicitudVehiculo, 'id'>,
  ): Promise<SolicitudVehiculo> {
    return this.estadoContratoRepository.solicitudVehiculos(id).create(solicitudVehiculo);
  }

  @patch('/estado-contratoes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'EstadoContrato.SolicitudVehiculo PATCH success count',
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
    return this.estadoContratoRepository.solicitudVehiculos(id).patch(solicitudVehiculo, where);
  }

  @del('/estado-contratoes/{id}/solicitud-vehiculos', {
    responses: {
      '200': {
        description: 'EstadoContrato.SolicitudVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudVehiculo)) where?: Where<SolicitudVehiculo>,
  ): Promise<Count> {
    return this.estadoContratoRepository.solicitudVehiculos(id).delete(where);
  }
}
