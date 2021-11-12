import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  CargoEmpleado,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoCargoEmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/cargo-empleado', {
    responses: {
      '200': {
        description: 'CargoEmpleado belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CargoEmpleado)},
          },
        },
      },
    },
  })
  async getCargoEmpleado(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<CargoEmpleado> {
    return this.empleadoRepository.cargoEmpleado(id);
  }
}
