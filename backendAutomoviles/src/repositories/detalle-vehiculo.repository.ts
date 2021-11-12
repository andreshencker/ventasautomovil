import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetalleVehiculo, DetalleVehiculoRelations, Empleado, Vehiculo, Ciudad} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {CiudadRepository} from './ciudad.repository';

export class DetalleVehiculoRepository extends DefaultCrudRepository<
  DetalleVehiculo,
  typeof DetalleVehiculo.prototype.id,
  DetalleVehiculoRelations
> {

  public readonly empleado: BelongsToAccessor<Empleado, typeof DetalleVehiculo.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof DetalleVehiculo.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof DetalleVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(DetalleVehiculo, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
