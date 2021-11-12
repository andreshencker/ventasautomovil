import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoTransaccion, TipoTransaccionRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class TipoTransaccionRepository extends DefaultCrudRepository<
  TipoTransaccion,
  typeof TipoTransaccion.prototype.id,
  TipoTransaccionRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof TipoTransaccion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(TipoTransaccion, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
