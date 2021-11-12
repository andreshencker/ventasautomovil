import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoTransaccion, TipoTransaccionRelations} from '../models';

export class TipoTransaccionRepository extends DefaultCrudRepository<
  TipoTransaccion,
  typeof TipoTransaccion.prototype.id,
  TipoTransaccionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoTransaccion, dataSource);
  }
}
