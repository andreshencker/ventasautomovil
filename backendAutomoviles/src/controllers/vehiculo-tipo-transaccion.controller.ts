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
  TipoTransaccion,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoTipoTransaccionController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/tipo-transaccion', {
    responses: {
      '200': {
        description: 'TipoTransaccion belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoTransaccion)},
          },
        },
      },
    },
  })
  async getTipoTransaccion(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<TipoTransaccion> {
    return this.vehiculoRepository.tipoTransaccion(id);
  }
}
