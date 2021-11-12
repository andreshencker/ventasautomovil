import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstudioSolicitud, EstudioSolicitudRelations, SolicitudVehiculo, Empleado} from '../models';
import {SolicitudVehiculoRepository} from './solicitud-vehiculo.repository';
import {EmpleadoRepository} from './empleado.repository';

export class EstudioSolicitudRepository extends DefaultCrudRepository<
  EstudioSolicitud,
  typeof EstudioSolicitud.prototype.id,
  EstudioSolicitudRelations
> {

  public readonly solicitudVehiculo: BelongsToAccessor<SolicitudVehiculo, typeof EstudioSolicitud.prototype.id>;

  

  public readonly empleado: BelongsToAccessor<Empleado, typeof EstudioSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudVehiculoRepository') protected solicitudVehiculoRepositoryGetter: Getter<SolicitudVehiculoRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(EstudioSolicitud, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);  
    this.solicitudVehiculo = this.createBelongsToAccessorFor('solicitudVehiculo', solicitudVehiculoRepositoryGetter,);
    this.registerInclusionResolver('solicitudVehiculo', this.solicitudVehiculo.inclusionResolver);
  }
}
