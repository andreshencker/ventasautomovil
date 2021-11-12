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
  SolicitudVehiculo,
  EstudioSolicitud,
} from '../models';
import {SolicitudVehiculoRepository} from '../repositories';

export class SolicitudVehiculoEstudioSolicitudController {
  constructor(
    @repository(SolicitudVehiculoRepository) protected solicitudVehiculoRepository: SolicitudVehiculoRepository,
  ) { }

  @get('/solicitud-vehiculos/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'Array of SolicitudVehiculo has many EstudioSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstudioSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EstudioSolicitud>,
  ): Promise<EstudioSolicitud[]> {
    return this.solicitudVehiculoRepository.estudioSolicituds(id).find(filter);
  }

  @post('/solicitud-vehiculos/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'SolicitudVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstudioSolicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudVehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {
            title: 'NewEstudioSolicitudInSolicitudVehiculo',
            exclude: ['id'],
            optional: ['solicitudVehiculoId']
          }),
        },
      },
    }) estudioSolicitud: Omit<EstudioSolicitud, 'id'>,
  ): Promise<EstudioSolicitud> {
    return this.solicitudVehiculoRepository.estudioSolicituds(id).create(estudioSolicitud);
  }

  @patch('/solicitud-vehiculos/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'SolicitudVehiculo.EstudioSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {partial: true}),
        },
      },
    })
    estudioSolicitud: Partial<EstudioSolicitud>,
    @param.query.object('where', getWhereSchemaFor(EstudioSolicitud)) where?: Where<EstudioSolicitud>,
  ): Promise<Count> {
    return this.solicitudVehiculoRepository.estudioSolicituds(id).patch(estudioSolicitud, where);
  }

  @del('/solicitud-vehiculos/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'SolicitudVehiculo.EstudioSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EstudioSolicitud)) where?: Where<EstudioSolicitud>,
  ): Promise<Count> {
    return this.solicitudVehiculoRepository.estudioSolicituds(id).delete(where);
  }
}
