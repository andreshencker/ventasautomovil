import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FotoVehiculo,
  Vehiculo,
} from '../models';
import {FotoVehiculoRepository} from '../repositories';

export class FotoVehiculoVehiculoController {
  constructor(
    @repository(FotoVehiculoRepository)
    public fotoVehiculoRepository: FotoVehiculoRepository,
  ) { }

  @get('/foto-vehiculos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to FotoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof FotoVehiculo.prototype.id,
  ): Promise<Vehiculo> {
    return this.fotoVehiculoRepository.vehiculo(id);
  }
}
