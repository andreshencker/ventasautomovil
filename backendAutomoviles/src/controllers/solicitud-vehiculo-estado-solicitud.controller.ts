import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudVehiculo,
  EstadoSolicitud,
} from '../models';
import {SolicitudVehiculoRepository} from '../repositories';

export class SolicitudVehiculoEstadoSolicitudController {
  constructor(
    @repository(SolicitudVehiculoRepository)
    public solicitudVehiculoRepository: SolicitudVehiculoRepository,
  ) { }

  @get('/solicitud-vehiculos/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'EstadoSolicitud belonging to SolicitudVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoSolicitud)},
          },
        },
      },
    },
  })
  async getEstadoSolicitud(
    @param.path.string('id') id: typeof SolicitudVehiculo.prototype.id,
  ): Promise<EstadoSolicitud> {
    return this.solicitudVehiculoRepository.estadoSolicitud(id);
  }
}
