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
  Ciudad,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoCiudadController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Ciudad> {
    return this.empleadoRepository.ciudad(id);
  }
}
