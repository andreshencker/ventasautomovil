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
  Marca,
  MarcaTipoVehiculo,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaMarcaTipoVehiculoController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Marca has many MarcaTipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MarcaTipoVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MarcaTipoVehiculo>,
  ): Promise<MarcaTipoVehiculo[]> {
    return this.marcaRepository.marcaTipoVehiculos(id).find(filter);
  }

  @post('/marcas/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(MarcaTipoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarcaTipoVehiculo, {
            title: 'NewMarcaTipoVehiculoInMarca',
            exclude: ['id'],
            optional: ['marcaId']
          }),
        },
      },
    }) marcaTipoVehiculo: Omit<MarcaTipoVehiculo, 'id'>,
  ): Promise<MarcaTipoVehiculo> {
    return this.marcaRepository.marcaTipoVehiculos(id).create(marcaTipoVehiculo);
  }

  @patch('/marcas/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Marca.MarcaTipoVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarcaTipoVehiculo, {partial: true}),
        },
      },
    })
    marcaTipoVehiculo: Partial<MarcaTipoVehiculo>,
    @param.query.object('where', getWhereSchemaFor(MarcaTipoVehiculo)) where?: Where<MarcaTipoVehiculo>,
  ): Promise<Count> {
    return this.marcaRepository.marcaTipoVehiculos(id).patch(marcaTipoVehiculo, where);
  }

  @del('/marcas/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Marca.MarcaTipoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MarcaTipoVehiculo)) where?: Where<MarcaTipoVehiculo>,
  ): Promise<Count> {
    return this.marcaRepository.marcaTipoVehiculos(id).delete(where);
  }
}
