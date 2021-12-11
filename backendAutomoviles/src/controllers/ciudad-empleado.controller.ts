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
  Ciudad,
  Empleado,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadEmpleadoController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.ciudadRepository.empleados(id).find(filter);
  }

  @post('/ciudads/{id}/empleados', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.ciudadRepository.empleados(id).create(empleado);
  }

  @patch('/ciudads/{id}/empleados', {
    responses: {
      '200': {
        description: 'Ciudad.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.ciudadRepository.empleados(id).patch(empleado, where);
  }

  @del('/ciudads/{id}/empleados', {
    responses: {
      '200': {
        description: 'Ciudad.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.ciudadRepository.empleados(id).delete(where);
  }
}
