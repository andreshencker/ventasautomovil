import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CargoEmpleado, CargoEmpleadoRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class CargoEmpleadoRepository extends DefaultCrudRepository<
  CargoEmpleado,
  typeof CargoEmpleado.prototype.id,
  CargoEmpleadoRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof CargoEmpleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(CargoEmpleado, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
