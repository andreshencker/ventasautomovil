import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, SolicitudVehiculo} from '../models';
import {SolicitudVehiculoRepository} from './solicitud-vehiculo.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly solicitudVehiculos: HasManyRepositoryFactory<SolicitudVehiculo, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudVehiculoRepository') protected solicitudVehiculoRepositoryGetter: Getter<SolicitudVehiculoRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitudVehiculos = this.createHasManyRepositoryFactoryFor('solicitudVehiculos', solicitudVehiculoRepositoryGetter,);
    this.registerInclusionResolver('solicitudVehiculos', this.solicitudVehiculos.inclusionResolver);
  }
}
