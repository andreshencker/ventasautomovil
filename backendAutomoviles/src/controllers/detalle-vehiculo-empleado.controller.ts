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
  Empleado,
} from '../models';
import {DetalleVehiculoRepository} from '../repositories';

export class DetalleVehiculoEmpleadoController {
  constructor(
    @repository(DetalleVehiculoRepository)
    public detalleVehiculoRepository: DetalleVehiculoRepository,
  ) { }

  @get('/detalle-vehiculos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to DetalleVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof DetalleVehiculo.prototype.id,
  ): Promise<Empleado> {
    return this.detalleVehiculoRepository.empleado(id);
  }
}
