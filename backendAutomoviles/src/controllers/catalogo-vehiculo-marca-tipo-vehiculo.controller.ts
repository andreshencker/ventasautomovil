import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CatalogoVehiculo,
  MarcaTipoVehiculo,
} from '../models';
import {CatalogoVehiculoRepository} from '../repositories';

export class CatalogoVehiculoMarcaTipoVehiculoController {
  constructor(
    @repository(CatalogoVehiculoRepository)
    public catalogoVehiculoRepository: CatalogoVehiculoRepository,
  ) { }

  @get('/catalogo-vehiculos/{id}/marca-tipo-vehiculo', {
    responses: {
      '200': {
        description: 'MarcaTipoVehiculo belonging to CatalogoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MarcaTipoVehiculo)},
          },
        },
      },
    },
  })
  async getMarcaTipoVehiculo(
    @param.path.string('id') id: typeof CatalogoVehiculo.prototype.id,
  ): Promise<MarcaTipoVehiculo> {
    return this.catalogoVehiculoRepository.marcaTipoVehiculo(id);
  }
}
