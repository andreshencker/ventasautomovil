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
  MarcaTipoVehiculo,
  CatalogoVehiculo,
} from '../models';
import {MarcaTipoVehiculoRepository} from '../repositories';

export class MarcaTipoVehiculoCatalogoVehiculoController {
  constructor(
    @repository(MarcaTipoVehiculoRepository) protected marcaTipoVehiculoRepository: MarcaTipoVehiculoRepository,
  ) { }

  @get('/marca-tipo-vehiculos/{id}/catalogo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of MarcaTipoVehiculo has many CatalogoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CatalogoVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CatalogoVehiculo>,
  ): Promise<CatalogoVehiculo[]> {
    return this.marcaTipoVehiculoRepository.catalogoVehiculos(id).find(filter);
  }

  @post('/marca-tipo-vehiculos/{id}/catalogo-vehiculos', {
    responses: {
      '200': {
        description: 'MarcaTipoVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(CatalogoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof MarcaTipoVehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoVehiculo, {
            title: 'NewCatalogoVehiculoInMarcaTipoVehiculo',
            exclude: ['id'],
            optional: ['marcaTipoVehiculoId']
          }),
        },
      },
    }) catalogoVehiculo: Omit<CatalogoVehiculo, 'id'>,
  ): Promise<CatalogoVehiculo> {
    return this.marcaTipoVehiculoRepository.catalogoVehiculos(id).create(catalogoVehiculo);
  }

  @patch('/marca-tipo-vehiculos/{id}/catalogo-vehiculos', {
    responses: {
      '200': {
        description: 'MarcaTipoVehiculo.CatalogoVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoVehiculo, {partial: true}),
        },
      },
    })
    catalogoVehiculo: Partial<CatalogoVehiculo>,
    @param.query.object('where', getWhereSchemaFor(CatalogoVehiculo)) where?: Where<CatalogoVehiculo>,
  ): Promise<Count> {
    return this.marcaTipoVehiculoRepository.catalogoVehiculos(id).patch(catalogoVehiculo, where);
  }

  @del('/marca-tipo-vehiculos/{id}/catalogo-vehiculos', {
    responses: {
      '200': {
        description: 'MarcaTipoVehiculo.CatalogoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CatalogoVehiculo)) where?: Where<CatalogoVehiculo>,
  ): Promise<Count> {
    return this.marcaTipoVehiculoRepository.catalogoVehiculos(id).delete(where);
  }
}
