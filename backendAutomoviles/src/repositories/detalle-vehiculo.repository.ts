import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleVehiculo, DetalleVehiculoRelations, Empleado, Vehiculo, Ciudad} from '../models';
import {VehiculoRepository} from './vehiculo.repository';


export class DetalleVehiculoRepository extends DefaultCrudRepository<
  DetalleVehiculo,
  typeof DetalleVehiculo.prototype.id,
  DetalleVehiculoRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof DetalleVehiculo.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof DetalleVehiculo.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof DetalleVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>
  ) {
    super(DetalleVehiculo, dataSource);

    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);

  }
}
