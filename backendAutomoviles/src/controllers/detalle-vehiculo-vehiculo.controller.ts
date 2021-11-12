import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleVehiculo,
  Vehiculo,
} from '../models';
import {DetalleVehiculoRepository} from '../repositories';

export class DetalleVehiculoVehiculoController {
  constructor(
    @repository(DetalleVehiculoRepository)
    public detalleVehiculoRepository: DetalleVehiculoRepository,
  ) { }

  @get('/detalle-vehiculos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to DetalleVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof DetalleVehiculo.prototype.id,
  ): Promise<Vehiculo> {
    return this.detalleVehiculoRepository.vehiculo(id);
  }
}
