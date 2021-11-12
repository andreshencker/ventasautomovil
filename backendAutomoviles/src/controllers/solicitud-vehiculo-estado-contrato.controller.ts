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
  EstadoContrato,
} from '../models';
import {SolicitudVehiculoRepository} from '../repositories';

export class SolicitudVehiculoEstadoContratoController {
  constructor(
    @repository(SolicitudVehiculoRepository)
    public solicitudVehiculoRepository: SolicitudVehiculoRepository,
  ) { }

  @get('/solicitud-vehiculos/{id}/estado-contrato', {
    responses: {
      '200': {
        description: 'EstadoContrato belonging to SolicitudVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoContrato)},
          },
        },
      },
    },
  })
  async getEstadoContrato(
    @param.path.string('id') id: typeof SolicitudVehiculo.prototype.id,
  ): Promise<EstadoContrato> {
    return this.solicitudVehiculoRepository.estadoContrato(id);
  }
}
