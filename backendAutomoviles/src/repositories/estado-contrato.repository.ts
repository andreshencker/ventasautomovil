import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EstadoContrato, EstadoContratoRelations, SolicitudVehiculo} from '../models';
import {SolicitudVehiculoRepository} from './solicitud-vehiculo.repository';

export class EstadoContratoRepository extends DefaultCrudRepository<
  EstadoContrato,
  typeof EstadoContrato.prototype.id,
  EstadoContratoRelations
> {

  public readonly solicitudVehiculos: HasManyRepositoryFactory<SolicitudVehiculo, typeof EstadoContrato.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudVehiculoRepository') protected solicitudVehiculoRepositoryGetter: Getter<SolicitudVehiculoRepository>,
  ) {
    super(EstadoContrato, dataSource);
    this.solicitudVehiculos = this.createHasManyRepositoryFactoryFor('solicitudVehiculos', solicitudVehiculoRepositoryGetter,);
    this.registerInclusionResolver('solicitudVehiculos', this.solicitudVehiculos.inclusionResolver);
  }
}
