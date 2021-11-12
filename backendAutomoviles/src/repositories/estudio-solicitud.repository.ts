import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstudioSolicitud, EstudioSolicitudRelations} from '../models';

export class EstudioSolicitudRepository extends DefaultCrudRepository<
  EstudioSolicitud,
  typeof EstudioSolicitud.prototype.id,
  EstudioSolicitudRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(EstudioSolicitud, dataSource);
  }
}
