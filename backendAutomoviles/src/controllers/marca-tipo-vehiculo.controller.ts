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
import {MarcaTipoVehiculo} from '../models';
import {MarcaTipoVehiculoRepository} from '../repositories';

export class MarcaTipoVehiculoController {
  constructor(
    @repository(MarcaTipoVehiculoRepository)
    public marcaTipoVehiculoRepository : MarcaTipoVehiculoRepository,
  ) {}

  @post('/marca-tipo-vehiculos')
  @response(200, {
    description: 'MarcaTipoVehiculo model instance',
    content: {'application/json': {schema: getModelSchemaRef(MarcaTipoVehiculo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarcaTipoVehiculo, {
            title: 'NewMarcaTipoVehiculo',
            exclude: ['id'],
          }),
        },
      },
    })
    marcaTipoVehiculo: Omit<MarcaTipoVehiculo, 'id'>,
  ): Promise<MarcaTipoVehiculo> {
    return this.marcaTipoVehiculoRepository.create(marcaTipoVehiculo);
  }

  @get('/marca-tipo-vehiculos/count')
  @response(200, {
    description: 'MarcaTipoVehiculo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MarcaTipoVehiculo) where?: Where<MarcaTipoVehiculo>,
  ): Promise<Count> {
    return this.marcaTipoVehiculoRepository.count(where);
  }

  @get('/marca-tipo-vehiculos')
  @response(200, {
    description: 'Array of MarcaTipoVehiculo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MarcaTipoVehiculo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MarcaTipoVehiculo) filter?: Filter<MarcaTipoVehiculo>,
  ): Promise<MarcaTipoVehiculo[]> {
    return this.marcaTipoVehiculoRepository.find(filter);
  }

  @patch('/marca-tipo-vehiculos')
  @response(200, {
    description: 'MarcaTipoVehiculo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarcaTipoVehiculo, {partial: true}),
        },
      },
    })
    marcaTipoVehiculo: MarcaTipoVehiculo,
    @param.where(MarcaTipoVehiculo) where?: Where<MarcaTipoVehiculo>,
  ): Promise<Count> {
    return this.marcaTipoVehiculoRepository.updateAll(marcaTipoVehiculo, where);
  }

  @get('/marca-tipo-vehiculos/{id}')
  @response(200, {
    description: 'MarcaTipoVehiculo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MarcaTipoVehiculo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MarcaTipoVehiculo, {exclude: 'where'}) filter?: FilterExcludingWhere<MarcaTipoVehiculo>
  ): Promise<MarcaTipoVehiculo> {
    return this.marcaTipoVehiculoRepository.findById(id, filter);
  }

  @patch('/marca-tipo-vehiculos/{id}')
  @response(204, {
    description: 'MarcaTipoVehiculo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarcaTipoVehiculo, {partial: true}),
        },
      },
    })
    marcaTipoVehiculo: MarcaTipoVehiculo,
  ): Promise<void> {
    await this.marcaTipoVehiculoRepository.updateById(id, marcaTipoVehiculo);
  }

  @put('/marca-tipo-vehiculos/{id}')
  @response(204, {
    description: 'MarcaTipoVehiculo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() marcaTipoVehiculo: MarcaTipoVehiculo,
  ): Promise<void> {
    await this.marcaTipoVehiculoRepository.replaceById(id, marcaTipoVehiculo);
  }

  @del('/marca-tipo-vehiculos/{id}')
  @response(204, {
    description: 'MarcaTipoVehiculo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.marcaTipoVehiculoRepository.deleteById(id);
  }
}
