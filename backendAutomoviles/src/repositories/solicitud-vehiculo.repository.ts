import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudVehiculo, SolicitudVehiculoRelations, EstadoContrato, EstadoSolicitud, EstudioSolicitud, Cliente} from '../models';
import {EstadoContratoRepository} from './estado-contrato.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {EstudioSolicitudRepository} from './estudio-solicitud.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudVehiculoRepository extends DefaultCrudRepository<
  SolicitudVehiculo,
  typeof SolicitudVehiculo.prototype.id,
  SolicitudVehiculoRelations
> {

  public readonly estadoContrato: BelongsToAccessor<EstadoContrato, typeof SolicitudVehiculo.prototype.id>;

  public readonly estadoSolicitud: BelongsToAccessor<EstadoSolicitud, typeof SolicitudVehiculo.prototype.id>;

  public readonly estudioSolicituds: HasManyRepositoryFactory<EstudioSolicitud, typeof SolicitudVehiculo.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudVehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstadoContratoRepository') protected estadoContratoRepositoryGetter: Getter<EstadoContratoRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('EstudioSolicitudRepository') protected estudioSolicitudRepositoryGetter: Getter<EstudioSolicitudRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(SolicitudVehiculo, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.estudioSolicituds = this.createHasManyRepositoryFactoryFor('estudioSolicituds', estudioSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estudioSolicituds', this.estudioSolicituds.inclusionResolver);
    this.estadoSolicitud = this.createBelongsToAccessorFor('estadoSolicitud', estadoSolicitudRepositoryGetter,);
    this.registerInclusionResolver('estadoSolicitud', this.estadoSolicitud.inclusionResolver);
    this.estadoContrato = this.createBelongsToAccessorFor('estadoContrato', estadoContratoRepositoryGetter,);
    this.registerInclusionResolver('estadoContrato', this.estadoContrato.inclusionResolver);
  }
}
