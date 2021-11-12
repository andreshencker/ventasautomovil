import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleVehiculo, DetalleVehiculoRelations} from '../models';

export class DetalleVehiculoRepository extends DefaultCrudRepository<
  DetalleVehiculo,
  typeof DetalleVehiculo.prototype.id,
  DetalleVehiculoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetalleVehiculo, dataSource);
  }
}
