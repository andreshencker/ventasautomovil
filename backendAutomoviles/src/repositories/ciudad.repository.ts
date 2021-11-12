import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, DetalleVehiculo} from '../models';
import {DetalleVehiculoRepository} from './detalle-vehiculo.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly detalleVehiculos: HasManyRepositoryFactory<DetalleVehiculo, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetalleVehiculoRepository') protected detalleVehiculoRepositoryGetter: Getter<DetalleVehiculoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.detalleVehiculos = this.createHasManyRepositoryFactoryFor('detalleVehiculos', detalleVehiculoRepositoryGetter,);
    this.registerInclusionResolver('detalleVehiculos', this.detalleVehiculos.inclusionResolver);
  }
}
