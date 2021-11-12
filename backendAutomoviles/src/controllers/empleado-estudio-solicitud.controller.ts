import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  EstudioSolicitud,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoEstudioSolicitudController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'Array of Empleado has many EstudioSolicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstudioSolicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EstudioSolicitud>,
  ): Promise<EstudioSolicitud[]> {
    return this.empleadoRepository.estudioSolicituds(id).find(filter);
  }

  @post('/empleados/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstudioSolicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {
            title: 'NewEstudioSolicitudInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) estudioSolicitud: Omit<EstudioSolicitud, 'id'>,
  ): Promise<EstudioSolicitud> {
    return this.empleadoRepository.estudioSolicituds(id).create(estudioSolicitud);
  }

  @patch('/empleados/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'Empleado.EstudioSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstudioSolicitud, {partial: true}),
        },
      },
    })
    estudioSolicitud: Partial<EstudioSolicitud>,
    @param.query.object('where', getWhereSchemaFor(EstudioSolicitud)) where?: Where<EstudioSolicitud>,
  ): Promise<Count> {
    return this.empleadoRepository.estudioSolicituds(id).patch(estudioSolicitud, where);
  }

  @del('/empleados/{id}/estudio-solicituds', {
    responses: {
      '200': {
        description: 'Empleado.EstudioSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EstudioSolicitud)) where?: Where<EstudioSolicitud>,
  ): Promise<Count> {
    return this.empleadoRepository.estudioSolicituds(id).delete(where);
  }
}
