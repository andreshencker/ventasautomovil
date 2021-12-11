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
  Marca,
} from '../models';
import {MarcaTipoVehiculoRepository} from '../repositories';

export class MarcaTipoVehiculoMarcaController {
  constructor(
    @repository(MarcaTipoVehiculoRepository)
    public marcaTipoVehiculoRepository: MarcaTipoVehiculoRepository,
  ) { }

  @get('/marca-tipo-vehiculos/{id}/marca', {
    responses: {
      '200': {
        description: 'Marca belonging to MarcaTipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async getMarca(
    @param.path.string('id') id: typeof MarcaTipoVehiculo.prototype.id,
  ): Promise<Marca> {
    return this.marcaTipoVehiculoRepository.marca(id);
  }
}
