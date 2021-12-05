import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CatalogoVehiculo, CatalogoVehiculoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class CatalogoVehiculoRepository extends DefaultCrudRepository<
  CatalogoVehiculo,
  typeof CatalogoVehiculo.prototype.id,
  CatalogoVehiculoRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof CatalogoVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(CatalogoVehiculo, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
