import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstadoSolicitud, EstadoSolicitudRelations, SolicitudVehiculo} from '../models';
import {SolicitudVehiculoRepository} from './solicitud-vehiculo.repository';

export class EstadoSolicitudRepository extends DefaultCrudRepository<
  EstadoSolicitud,
  typeof EstadoSolicitud.prototype.id,
  EstadoSolicitudRelations
> {

  public readonly solicitudVehiculos: HasManyRepositoryFactory<SolicitudVehiculo, typeof EstadoSolicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudVehiculoRepository') protected solicitudVehiculoRepositoryGetter: Getter<SolicitudVehiculoRepository>,
  ) {
    super(EstadoSolicitud, dataSource);
    this.solicitudVehiculos = this.createHasManyRepositoryFactoryFor('solicitudVehiculos', solicitudVehiculoRepositoryGetter,);
    this.registerInclusionResolver('solicitudVehiculos', this.solicitudVehiculos.inclusionResolver);
  }
}
