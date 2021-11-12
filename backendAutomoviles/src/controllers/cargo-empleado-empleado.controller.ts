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
  CargoEmpleado,
  Empleado,
} from '../models';
import {CargoEmpleadoRepository} from '../repositories';

export class CargoEmpleadoEmpleadoController {
  constructor(
    @repository(CargoEmpleadoRepository) protected cargoEmpleadoRepository: CargoEmpleadoRepository,
  ) { }

  @get('/cargo-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of CargoEmpleado has many Empleado',
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
    return this.cargoEmpleadoRepository.empleados(id).find(filter);
  }

  @post('/cargo-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'CargoEmpleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CargoEmpleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInCargoEmpleado',
            exclude: ['id'],
            optional: ['cargoEmpleadoId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.cargoEmpleadoRepository.empleados(id).create(empleado);
  }

  @patch('/cargo-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'CargoEmpleado.Empleado PATCH success count',
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
    return this.cargoEmpleadoRepository.empleados(id).patch(empleado, where);
  }

  @del('/cargo-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'CargoEmpleado.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.cargoEmpleadoRepository.empleados(id).delete(where);
  }
}
