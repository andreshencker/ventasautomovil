import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, CargoEmpleado,  EstudioSolicitud, Ciudad} from '../models';
import {CargoEmpleadoRepository} from './cargo-empleado.repository';

import {EstudioSolicitudRepository} from './estudio-solicitud.repository';
import {CiudadRepository} from './ciudad.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly cargoEmpleado: BelongsToAccessor<CargoEmpleado, typeof Empleado.prototype.id>;



  public readonly estudioSolicituds: HasManyRepositoryFactory<EstudioSolicitud, typeof Empleado.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CargoEmpleadoRepository') protected cargoEmpleadoRepositoryGetter: Getter<CargoEmpleadoRepository>, @repository.getter('EstudioSolicitudRepository') protected estudioSolicitudRepositoryGetter: Getter<EstudioSolicitudRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Empleado, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.estudioSolicituds = this.createHasManyRepositoryFactoryFor('estudioSolicituds', estudioSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estudioSolicituds', this.estudioSolicituds.inclusionResolver);
    this.cargoEmpleado = this.createBelongsToAccessorFor('cargoEmpleado', cargoEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('cargoEmpleado', this.cargoEmpleado.inclusionResolver);
  }
}
