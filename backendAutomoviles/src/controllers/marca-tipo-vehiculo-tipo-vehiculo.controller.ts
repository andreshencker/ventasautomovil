import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MarcaTipoVehiculo,
  TipoVehiculo,
} from '../models';
import {MarcaTipoVehiculoRepository} from '../repositories';

export class MarcaTipoVehiculoTipoVehiculoController {
  constructor(
    @repository(MarcaTipoVehiculoRepository)
    public marcaTipoVehiculoRepository: MarcaTipoVehiculoRepository,
  ) { }

  @get('/marca-tipo-vehiculos/{id}/tipo-vehiculo', {
    responses: {
      '200': {
        description: 'TipoVehiculo belonging to MarcaTipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoVehiculo)},
          },
        },
      },
    },
  })
  async getTipoVehiculo(
    @param.path.string('id') id: typeof MarcaTipoVehiculo.prototype.id,
  ): Promise<TipoVehiculo> {
    return this.marcaTipoVehiculoRepository.tipoVehiculo(id);
  }
}
