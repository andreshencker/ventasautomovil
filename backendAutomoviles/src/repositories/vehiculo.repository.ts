import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, TipoVehiculo, TipoTransaccion, DetalleVehiculo} from '../models';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {TipoTransaccionRepository} from './tipo-transaccion.repository';
import {DetalleVehiculoRepository} from './detalle-vehiculo.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly tipoVehiculo: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype.id>;

  public readonly tipoTransaccion: BelongsToAccessor<TipoTransaccion, typeof Vehiculo.prototype.id>;

  public readonly detalleVehiculos: HasManyRepositoryFactory<DetalleVehiculo, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('TipoTransaccionRepository') protected tipoTransaccionRepositoryGetter: Getter<TipoTransaccionRepository>, @repository.getter('DetalleVehiculoRepository') protected detalleVehiculoRepositoryGetter: Getter<DetalleVehiculoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.detalleVehiculos = this.createHasManyRepositoryFactoryFor('detalleVehiculos', detalleVehiculoRepositoryGetter,);
    this.registerInclusionResolver('detalleVehiculos', this.detalleVehiculos.inclusionResolver);
    this.tipoTransaccion = this.createBelongsToAccessorFor('tipoTransaccion', tipoTransaccionRepositoryGetter,);
    this.registerInclusionResolver('tipoTransaccion', this.tipoTransaccion.inclusionResolver);
    this.tipoVehiculo = this.createBelongsToAccessorFor('tipoVehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculo', this.tipoVehiculo.inclusionResolver);
  }
}