import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, CargoEmpleado, DetalleVehiculo, EstudioSolicitud} from '../models';
import {CargoEmpleadoRepository} from './cargo-empleado.repository';
import {DetalleVehiculoRepository} from './detalle-vehiculo.repository';
import {EstudioSolicitudRepository} from './estudio-solicitud.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly cargoEmpleado: BelongsToAccessor<CargoEmpleado, typeof Empleado.prototype.id>;

  public readonly detalleVehiculos: HasManyRepositoryFactory<DetalleVehiculo, typeof Empleado.prototype.id>;

  public readonly estudioSolicituds: HasManyRepositoryFactory<EstudioSolicitud, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CargoEmpleadoRepository') protected cargoEmpleadoRepositoryGetter: Getter<CargoEmpleadoRepository>, @repository.getter('DetalleVehiculoRepository') protected detalleVehiculoRepositoryGetter: Getter<DetalleVehiculoRepository>, @repository.getter('EstudioSolicitudRepository') protected estudioSolicitudRepositoryGetter: Getter<EstudioSolicitudRepository>,
  ) {
    super(Empleado, dataSource);
    this.estudioSolicituds = this.createHasManyRepositoryFactoryFor('estudioSolicituds', estudioSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estudioSolicituds', this.estudioSolicituds.inclusionResolver);
    this.detalleVehiculos = this.createHasManyRepositoryFactoryFor('detalleVehiculos', detalleVehiculoRepositoryGetter,);
    this.registerInclusionResolver('detalleVehiculos', this.detalleVehiculos.inclusionResolver);
    this.cargoEmpleado = this.createBelongsToAccessorFor('cargoEmpleado', cargoEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('cargoEmpleado', this.cargoEmpleado.inclusionResolver);
  }
}
