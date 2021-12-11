import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MarcaTipoVehiculo, MarcaTipoVehiculoRelations, Marca, TipoVehiculo} from '../models';
import {MarcaRepository} from './marca.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';

export class MarcaTipoVehiculoRepository extends DefaultCrudRepository<
  MarcaTipoVehiculo,
  typeof MarcaTipoVehiculo.prototype.id,
  MarcaTipoVehiculoRelations
> {

  public readonly marca: BelongsToAccessor<Marca, typeof MarcaTipoVehiculo.prototype.id>;

  public readonly tipoVehiculo: BelongsToAccessor<TipoVehiculo, typeof MarcaTipoVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>,
  ) {
    super(MarcaTipoVehiculo, dataSource);
    this.tipoVehiculo = this.createBelongsToAccessorFor('tipoVehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculo', this.tipoVehiculo.inclusionResolver);
    this.marca = this.createBelongsToAccessorFor('marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('marca', this.marca.inclusionResolver);
  }
}
