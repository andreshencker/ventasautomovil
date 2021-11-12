import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstudioSolicitud,
  SolicitudVehiculo,
} from '../models';
import {EstudioSolicitudRepository} from '../repositories';

export class EstudioSolicitudSolicitudVehiculoController {
  constructor(
    @repository(EstudioSolicitudRepository)
    public estudioSolicitudRepository: EstudioSolicitudRepository,
  ) { }

  @get('/estudio-solicituds/{id}/solicitud-vehiculo', {
    responses: {
      '200': {
        description: 'SolicitudVehiculo belonging to EstudioSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudVehiculo)},
          },
        },
      },
    },
  })
  async getSolicitudVehiculo(
    @param.path.string('id') id: typeof EstudioSolicitud.prototype.id,
  ): Promise<SolicitudVehiculo> {
    return this.estudioSolicitudRepository.solicitudVehiculo(id);
  }
}
