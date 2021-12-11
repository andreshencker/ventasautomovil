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
  TipoVehiculo,
  MarcaTipoVehiculo,
} from '../models';
import {TipoVehiculoRepository} from '../repositories';

export class TipoVehiculoMarcaTipoVehiculoController {
  constructor(
    @repository(TipoVehiculoRepository) protected tipoVehiculoRepository: TipoVehiculoRepository,
  ) { }

  @get('/tipo-vehiculos/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of TipoVehiculo has many MarcaTipoVehiculo',
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
    return this.tipoVehiculoRepository.marcaTipoVehiculos(id).find(filter);
  }

  @post('/tipo-vehiculos/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'TipoVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(MarcaTipoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoVehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MarcaTipoVehiculo, {
            title: 'NewMarcaTipoVehiculoInTipoVehiculo',
            exclude: ['id'],
            optional: ['tipoVehiculoId']
          }),
        },
      },
    }) marcaTipoVehiculo: Omit<MarcaTipoVehiculo, 'id'>,
  ): Promise<MarcaTipoVehiculo> {
    return this.tipoVehiculoRepository.marcaTipoVehiculos(id).create(marcaTipoVehiculo);
  }

  @patch('/tipo-vehiculos/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'TipoVehiculo.MarcaTipoVehiculo PATCH success count',
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
    return this.tipoVehiculoRepository.marcaTipoVehiculos(id).patch(marcaTipoVehiculo, where);
  }

  @del('/tipo-vehiculos/{id}/marca-tipo-vehiculos', {
    responses: {
      '200': {
        description: 'TipoVehiculo.MarcaTipoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MarcaTipoVehiculo)) where?: Where<MarcaTipoVehiculo>,
  ): Promise<Count> {
    return this.tipoVehiculoRepository.marcaTipoVehiculos(id).delete(where);
  }
}
