import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CatalogoVehiculo, CatalogoVehiculoRelations, MarcaTipoVehiculo, Vehiculo} from '../models';
import {MarcaTipoVehiculoRepository} from './marca-tipo-vehiculo.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class CatalogoVehiculoRepository extends DefaultCrudRepository<
  CatalogoVehiculo,
  typeof CatalogoVehiculo.prototype.id,
  CatalogoVehiculoRelations
> {

  public readonly marcaTipoVehiculo: BelongsToAccessor<MarcaTipoVehiculo, typeof CatalogoVehiculo.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof CatalogoVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MarcaTipoVehiculoRepository') protected marcaTipoVehiculoRepositoryGetter: Getter<MarcaTipoVehiculoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(CatalogoVehiculo, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.marcaTipoVehiculo = this.createBelongsToAccessorFor('marcaTipoVehiculo', marcaTipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('marcaTipoVehiculo', this.marcaTipoVehiculo.inclusionResolver);
  }
}
