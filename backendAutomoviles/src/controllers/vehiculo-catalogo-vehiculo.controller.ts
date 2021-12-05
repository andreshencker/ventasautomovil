import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  CatalogoVehiculo,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoCatalogoVehiculoController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/catalogo-vehiculo', {
    responses: {
      '200': {
        description: 'CatalogoVehiculo belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CatalogoVehiculo)},
          },
        },
      },
    },
  })
  async getCatalogoVehiculo(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<CatalogoVehiculo> {
    return this.vehiculoRepository.catalogoVehiculo(id);
  }
}
