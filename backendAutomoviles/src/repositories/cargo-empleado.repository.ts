import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CargoEmpleado, CargoEmpleadoRelations} from '../models';

export class CargoEmpleadoRepository extends DefaultCrudRepository<
  CargoEmpleado,
  typeof CargoEmpleado.prototype.id,
  CargoEmpleadoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CargoEmpleado, dataSource);
  }
}
