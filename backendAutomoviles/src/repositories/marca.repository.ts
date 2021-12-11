import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Marca, MarcaRelations, MarcaTipoVehiculo} from '../models';
import {MarcaTipoVehiculoRepository} from './marca-tipo-vehiculo.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly marcaTipoVehiculos: HasManyRepositoryFactory<MarcaTipoVehiculo, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MarcaTipoVehiculoRepository') protected marcaTipoVehiculoRepositoryGetter: Getter<MarcaTipoVehiculoRepository>,
  ) {
    super(Marca, dataSource);
    this.marcaTipoVehiculos = this.createHasManyRepositoryFactoryFor('marcaTipoVehiculos', marcaTipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('marcaTipoVehiculos', this.marcaTipoVehiculos.inclusionResolver);

  }
}
