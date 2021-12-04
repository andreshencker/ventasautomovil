import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {FotoVehiculo, FotoVehiculoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class FotoVehiculoRepository extends DefaultCrudRepository<
  FotoVehiculo,
  typeof FotoVehiculo.prototype.id,
  FotoVehiculoRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof FotoVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(FotoVehiculo, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
