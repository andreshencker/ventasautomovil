import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstudioSolicitud,
  Empleado,
} from '../models';
import {EstudioSolicitudRepository} from '../repositories';

export class EstudioSolicitudEmpleadoController {
  constructor(
    @repository(EstudioSolicitudRepository)
    public estudioSolicitudRepository: EstudioSolicitudRepository,
  ) { }

  @get('/estudio-solicituds/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to EstudioSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof EstudioSolicitud.prototype.id,
  ): Promise<Empleado> {
    return this.estudioSolicitudRepository.empleado(id);
  }
}
