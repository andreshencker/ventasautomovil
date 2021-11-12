import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstadoContrato, EstadoContratoRelations} from '../models';

export class EstadoContratoRepository extends DefaultCrudRepository<
  EstadoContrato,
  typeof EstadoContrato.prototype.id,
  EstadoContratoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(EstadoContrato, dataSource);
  }
}
