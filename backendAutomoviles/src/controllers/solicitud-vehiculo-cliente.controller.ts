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
  Cliente,
} from '../models';
import {SolicitudVehiculoRepository} from '../repositories';

export class SolicitudVehiculoClienteController {
  constructor(
    @repository(SolicitudVehiculoRepository)
    public solicitudVehiculoRepository: SolicitudVehiculoRepository,
  ) { }

  @get('/solicitud-vehiculos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to SolicitudVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof SolicitudVehiculo.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudVehiculoRepository.cliente(id);
  }
}
