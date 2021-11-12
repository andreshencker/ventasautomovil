import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CargoEmpleado} from '../models';
import {CargoEmpleadoRepository} from '../repositories';

export class CargoEmpleadoController {
  constructor(
    @repository(CargoEmpleadoRepository)
    public cargoEmpleadoRepository : CargoEmpleadoRepository,
  ) {}

  @post('/cargo-empleados')
  @response(200, {
    description: 'CargoEmpleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(CargoEmpleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CargoEmpleado, {
            title: 'NewCargoEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    cargoEmpleado: Omit<CargoEmpleado, 'id'>,
  ): Promise<CargoEmpleado> {
    return this.cargoEmpleadoRepository.create(cargoEmpleado);
  }

  @get('/cargo-empleados/count')
  @response(200, {
    description: 'CargoEmpleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CargoEmpleado) where?: Where<CargoEmpleado>,
  ): Promise<Count> {
    return this.cargoEmpleadoRepository.count(where);
  }

  @get('/cargo-empleados')
  @response(200, {
    description: 'Array of CargoEmpleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CargoEmpleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CargoEmpleado) filter?: Filter<CargoEmpleado>,
  ): Promise<CargoEmpleado[]> {
    return this.cargoEmpleadoRepository.find(filter);
  }

  @patch('/cargo-empleados')
  @response(200, {
    description: 'CargoEmpleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CargoEmpleado, {partial: true}),
        },
      },
    })
    cargoEmpleado: CargoEmpleado,
    @param.where(CargoEmpleado) where?: Where<CargoEmpleado>,
  ): Promise<Count> {
    return this.cargoEmpleadoRepository.updateAll(cargoEmpleado, where);
  }

  @get('/cargo-empleados/{id}')
  @response(200, {
    description: 'CargoEmpleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CargoEmpleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CargoEmpleado, {exclude: 'where'}) filter?: FilterExcludingWhere<CargoEmpleado>
  ): Promise<CargoEmpleado> {
    return this.cargoEmpleadoRepository.findById(id, filter);
  }

  @patch('/cargo-empleados/{id}')
  @response(204, {
    description: 'CargoEmpleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CargoEmpleado, {partial: true}),
        },
      },
    })
    cargoEmpleado: CargoEmpleado,
  ): Promise<void> {
    await this.cargoEmpleadoRepository.updateById(id, cargoEmpleado);
  }

  @put('/cargo-empleados/{id}')
  @response(204, {
    description: 'CargoEmpleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cargoEmpleado: CargoEmpleado,
  ): Promise<void> {
    await this.cargoEmpleadoRepository.replaceById(id, cargoEmpleado);
  }

  @del('/cargo-empleados/{id}')
  @response(204, {
    description: 'CargoEmpleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cargoEmpleadoRepository.deleteById(id);
  }
}
