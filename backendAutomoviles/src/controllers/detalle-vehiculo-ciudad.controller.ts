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
  Ciudad,
} from '../models';
import {DetalleVehiculoRepository} from '../repositories';

export class DetalleVehiculoCiudadController {
  constructor(
    @repository(DetalleVehiculoRepository)
    public detalleVehiculoRepository: DetalleVehiculoRepository,
  ) { }

  @get('/detalle-vehiculos/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to DetalleVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof DetalleVehiculo.prototype.id,
  ): Promise<Ciudad> {
    return this.detalleVehiculoRepository.ciudad(id);
  }
}
