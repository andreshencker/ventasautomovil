import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoVehiculo, TipoVehiculoRelations, MarcaTipoVehiculo} from '../models';
import {MarcaTipoVehiculoRepository} from './marca-tipo-vehiculo.repository';

export class TipoVehiculoRepository extends DefaultCrudRepository<
  TipoVehiculo,
  typeof TipoVehiculo.prototype.id,
  TipoVehiculoRelations
> {

  public readonly marcaTipoVehiculos: HasManyRepositoryFactory<MarcaTipoVehiculo, typeof TipoVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MarcaTipoVehiculoRepository') protected marcaTipoVehiculoRepositoryGetter: Getter<MarcaTipoVehiculoRepository>,
  ) {
    super(TipoVehiculo, dataSource);
    this.marcaTipoVehiculos = this.createHasManyRepositoryFactoryFor('marcaTipoVehiculos', marcaTipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('marcaTipoVehiculos', this.marcaTipoVehiculos.inclusionResolver);

  }
}
