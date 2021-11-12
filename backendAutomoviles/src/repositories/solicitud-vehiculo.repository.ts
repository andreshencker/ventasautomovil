import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudVehiculo, SolicitudVehiculoRelations} from '../models';

export class SolicitudVehiculoRepository extends DefaultCrudRepository<
  SolicitudVehiculo,
  typeof SolicitudVehiculo.prototype.id,
  SolicitudVehiculoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(SolicitudVehiculo, dataSource);
  }
}
